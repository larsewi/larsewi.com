# Droplet setup

Step-by-step provisioning for a fresh Ubuntu/Debian droplet so that
`./deploy.sh` "just works" against **larsewi.com**.

The site is a static Vite build served by Apache from `/var/www/larsewi.com`
(the rsync target in `deploy.sh`).

Run everything below as `root` on the fresh droplet unless noted otherwise:

```bash
ssh root@<droplet-ip>
```

## 1. Update the base system

```bash
apt update && apt upgrade -y
```

## 2. Create the `larsewi` user with root access

```bash
adduser larsewi          # prompts for a password
usermod -aG sudo larsewi # sudo (root) access via that password
```

`larsewi` can now run any command with `sudo`, authenticating with its own
password.

## 3. Give larsewi an SSH key (key-only login)

SSH uses key authentication only — no passwords over SSH. The password from
step 2 is still used for `sudo`.

Reuse the key that already works for `root` by copying its `authorized_keys`
to the new user:

```bash
# On the droplet, as root:
mkdir -p /home/larsewi/.ssh
cp /root/.ssh/authorized_keys /home/larsewi/.ssh/authorized_keys
chown -R larsewi:larsewi /home/larsewi/.ssh
chmod 700 /home/larsewi/.ssh
chmod 600 /home/larsewi/.ssh/authorized_keys
```

## 4. Disable root SSH login and password authentication

Create a drop-in config. The `00-` prefix makes SSH read it first, so it
overrides any cloud-init default (e.g. `50-cloud-init.conf`):

```bash
cat > /etc/ssh/sshd_config.d/00-larsewi.conf <<'EOF'
PermitRootLogin no
PasswordAuthentication no
EOF
```

Validate and restart:

```bash
sshd -t
systemctl restart ssh || systemctl restart sshd
```

> Before closing this root session, test in a **new terminal** that
> `ssh larsewi@<droplet-ip>` works with your key. If it fails, you still have
> the root session open to fix it.

## 5. Install Apache

```bash
apt install -y apache2
```

## 6. Create the web root (owned by larsewi)

`larsewi` owns it so rsync deploys work without `sudo`:

```bash
mkdir -p /var/www/larsewi.com
chown -R larsewi:larsewi /var/www/larsewi.com
chmod 755 /var/www/larsewi.com
```

## 7. Configure the virtual host

```bash
cat > /etc/apache2/sites-available/larsewi.com.conf <<'EOF'
<VirtualHost *:80>
    ServerName larsewi.com
    ServerAlias www.larsewi.com
    DocumentRoot /var/www/larsewi.com

    <Directory /var/www/larsewi.com>
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/larsewi.com-error.log
    CustomLog ${APACHE_LOG_DIR}/larsewi.com-access.log combined
</VirtualHost>
EOF
```

Enable it, drop the default vhost, and reload:

```bash
a2ensite larsewi.com.conf
a2dissite 000-default.conf
apache2ctl configtest
systemctl enable apache2
systemctl reload apache2
```

## 8. Open the firewall

```bash
ufw allow OpenSSH
ufw allow 'Apache Full'
ufw --force enable
```

## 9. Point DNS at the droplet

Create these records at your DNS provider:

| Type | Name | Value           |
|------|------|-----------------|
| A    | `@`  | `<droplet-ip>`  |
| A    | `www`| `<droplet-ip>`  |

Wait for it to resolve: `dig +short larsewi.com`.

## 10. (Optional) Enable HTTPS

Once DNS resolves to the droplet:

```bash
apt install -y certbot python3-certbot-apache
certbot --apache --redirect \
  -m lars.erik.wik@northern.tech --agree-tos \
  -d larsewi.com -d www.larsewi.com
```

Certbot sets up the HTTPS vhost and auto-renewal.

## 11. Deploy

From your workstation (the `deploy.sh` target is
`larsewi.com:/var/www/larsewi.com/`, so it connects as the local user
`larsewi` → remote `larsewi`):

```bash
./deploy.sh
```

Visit <https://larsewi.com>.
