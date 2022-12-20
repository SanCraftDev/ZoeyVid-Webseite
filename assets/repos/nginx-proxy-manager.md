<p align="center">
	<img src="https://nginxproxymanager.com/github.png">
	<br><br>
	<img src="https://img.shields.io/badge/version-2.9.19+-green.svg?style=for-the-badge">
	<a href="https://hub.docker.com/r/zoeyvid/nginx-proxy-manager">
		<img src="https://img.shields.io/docker/stars/zoeyvid/nginx-proxy-manager.svg?style=for-the-badge">
	</a>
	<a href="https://hub.docker.com/r/zoeyvid/nginx-proxy-manager">
		<img src="https://img.shields.io/docker/pulls/zoeyvid/nginx-proxy-manager.svg?style=for-the-badge">
	</a>
</p>


This project comes as a pre-built docker image that enables you to easily forward to your websites
running at home or otherwise, including free SSL, without having to know too much about Nginx or Letsencrypt.

- [Quick Setup](#quick-setup)
- [Screenshots](https://nginxproxymanager.com/screenshots)


## Project Goal

I created this project to fill a personal need to provide users with a easy way to accomplish reverse
proxying hosts with SSL termination and it had to be so easy that a monkey could do it. This goal hasn't changed.
While there might be advanced options they are optional and the project should be as simple as possible
so that the barrier for entry here is low.

<a href="https://www.buymeacoffee.com/jc21" target="_blank"><img src="http://public.jc21.com/github/by-me-a-coffee.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>


## Features

- Beautiful and Secure Admin Interface based on [Tabler](https://tabler.github.io/)
- Easily create forwarding domains, redirections, streams and 404 hosts without knowing anything about Nginx
- Free SSL using Let's Encrypt or provide your own custom SSL certificates
- Access Lists and basic HTTP Authentication for your hosts
- Advanced Nginx configuration available for super users
- User management, permissions and audit log


# New Features

- HTTP/3 (QUIC) Support if you enable HTTP/2 (can not be enabled separate)
- Fix Proxy Hosts, if origin only accepts TLSv1.3
- Only use TLSv1.2 and TLSv1.3
- Uses OCSP Stapling
  - Needs manual migration if you use custom certificates, just upload the CA/Intermediate Certificate (file name: `chain.pem`) in the `/opt/npm/custom_ssl/npm-[certificate-id]` folder
- Smaller then the original
- Runs the admin interface on port 81 with ssl (https)
- Default page runs also with ssl (https)
- Uses [fancyindex](https://gitHub.com/Naereen/Nginx-Fancyindex-Theme) if you use the npm directly as webserver
- Expose INTERNAL backend api only to localhost
- Easy security headers, see [here](https://github.com/GetPageSpeed/ngx_security_headers), enabled by default if you enable hsts
- Access Log disabled
- Error Log written to console
- PHP included, you can add php extensions, see aviable packages here: https://pkgs.alpinelinux.org/packages?name=php*

## Soon
- more
- I will try to create a pr to contribute to the original project

# Use as webserver

1. Create a new Proxy Host
2. Set `Scheme` to `http`, `Forward Hostname / IP` to `0.0.0.0`, `Forward Port` to `1` and enable `Websockets Support` (you can also use other values, since these get fully ignored)
3. Maybe set an Access List
4. Make your SSL Settings
5.1 Custom Nginx Configuration (advanced tab), which looks the following for plain html, the slash at the end of the file path is important:
```
location / {
alias /var/www/<your-html-site-folder-name>/;
}
```
5.2 Custom Nginx Configuration (advanced tab), which looks the following for plain html & php, the slash at the end of the file path is important:
```
location / {
alias /var/www/<your-php-site-folder-name>/;

location ~ [^/]\.php(/|$) {
fastcgi_pass php82;
fastcgi_split_path_info ^(.+?\.php)(/.*)$;
if (!-f $document_root$fastcgi_script_name) {return 404;}
}
```

# Quick Setup

1. Install Docker and Docker Compose (or portainer)

- [Docker Install documentation](https://docs.docker.com/engine)
- [Docker Compose Install documentation](https://docs.docker.com/compose/install/linux)

2. Create a compose.yaml file similar to this (or use it as a portainer stack):

```yml
version: "3"
services:
    nginx-proxy-manager:
        container_name: nginx-proxy-manager
        image: zoeyvid/nginx-proxy-manager
        restart: always
        network_mode: host
        volumes:
        - "/opt/npm:/data"
        - "/opt/npm-letsencrypt:/etc/letsencrypt" # Only needed for first time migration from original nginx-proxy-manager to this fork
        - "/var/www:/var/www" # optional, if you want to use it as webserver for html
        environment:
        - "TZ=Europe/Berlin"
#        - "NGINX_LOG_NOT_FOUND=true" # Allow logging of 404 errors
#        - "NPM_LISTEN_LOCALHOST=true" # Bind the NPM Dashboard on Port 81 only to localhost
#        - "PHP_APKS=php7-curl php8-curl php81-curl php-82-curl" # Add php extensions, see aviable packages here: https://pkgs.alpinelinux.org/packages?name=php*
```

3. Bring up your stack by running (or deploy your portainer stack)
```bash
docker compose up -d
```

4. Log in to the Admin UI

When your docker container is running, connect to it on port `81` for the admin interface.
Sometimes this can take a little bit because of the entropy of keys.
You may need to open port 81 in your firewall.
You may need to use another IP-Adress.

[https://127.0.0.1:81](https://127.0.0.1:81)

Default Admin User:
```
Email:    admin@example.com
Password: 9KcvfmAvcVonB7YOMqdjJGsTG2JL058Rx6xFNMintAeaGETsRBRlSbfXdi1inoCa
```

Immediately after logging in with this default user you will be asked to modify your details and change your password.


## Contributors

Special thanks to [all of our contributors](https://github.com/NginxProxyManager/nginx-proxy-manager/graphs/contributors).


# Please report Bugs first to this fork before reporting them to the original Repository

## Getting Support

1. [Found a bug?](https://github.com/ZoeyVid/nginx-proxy-manager/issues)
2. [Discussions](https://github.com/ZoeyVid/nginx-proxy-manager/discussions)
<!---
3. [Development Gitter](https://gitter.im/nginx-proxy-manager/community)
4. [Reddit](https://reddit.com/r/nginxproxymanager)
--->
