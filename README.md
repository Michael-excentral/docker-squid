Squid logs are saved in the logs folder, to enable external processing and to keep them regardless of rebuilding docker images and so on

Configuration is in the etc folder, passwords and squid.conf (and others if needed)

Using ports 8888 & 8889 (not yet) for the proxy
Using port 8080 for the statistics (not protected yet)

Serving pac files in folder "pacs" from host:8080/pacs
