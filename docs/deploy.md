# Deploy

Add the following `.htaccess` file to redirect all Angular routes to the main Angular app (index.html):
```
<Ifmodule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
</IfModule>
```
