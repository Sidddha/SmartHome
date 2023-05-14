#!/bin/bash

# Set the installation directory
INSTALL_DIR=/mnt/data/additional_packages

# Download the Docker CE package
#curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
#sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
#sudo apt-get update
#apt-get download docker-ce
#sudo apt-get download docker-ce-cli
#sudo apt-get download containerd.io
#sudo apt-get download docker-compose-plugin

# Download the Docker Compose package
sudo curl -O "https://download.docker.com/linux/debian/dists/$(lsb_release -c -s)/pool/stable/docker-compose-plugin_2.6.0~debian-$(lsb_release -c -s)_armhf.deb"
sudo curl -O "https://download.docker.com/linux/debian/dists/$(lsb_release -c -s)/pool/stable/docker-buildx-plugin_0.10.4-1~debian.11~$(lsb_release -c -s)_armhf.deb"  
#sudo chmod +x /usr/local/bin/docker-compose

# Install the downloaded packages to the installation directory
sudo dpkg --instdir=$INSTALL_DIR -i ./*.deb

# Create symbolic links to the standard directories
sudo ln -s $INSTALL_DIR/usr/share/man/man1/docker.1.gz /usr/share/man/man1/docker.1.gz
sudo ln -s $INSTALL_DIR/usr/bin/docker /usr/bin/docker
sudo ln -s $INSTALL_DIR/usr/bin/containerd /usr/bin/containerd
sudo ln -s $INSTALL_DIR/usr/bin/docker-compose /usr/bin/docker-compose
