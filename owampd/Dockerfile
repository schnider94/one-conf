FROM ubuntu

RUN apt-get update

RUN apt-get install -y git automake autoconf gcc make g++ zlib1g-dev groff-base

RUN git clone https://github.com/perfsonar/owamp.git

RUN cd owamp/ && \
    git submodule update --init && \
    ./bootstrap && \
    ./configure && \
    make && \
    ln -s /owamp/owampd/owampd /usr/local/bin/

CMD ["owampd", "-f", "-Z", "-a", "O", "-P", "8760-8761"]
EXPOSE 861
