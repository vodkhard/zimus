FROM node:lts-buster

# hadolint ignore=DL3008,DL3009
RUN apt-get update && apt-get --no-install-recommends -y install \
    curl \
    build-essential \
    pkg-config \
    make \
    cmake \
    yasm \
    nasm \
    automake \
    autoconf \
    libtool \
    libglib2.0-dev \
    libexpat1-dev \
    libwebp-dev \
    libpng-dev \
    libtiff5-dev \
    libfftw3-dev \
    librsvg2-dev \
    libgif-dev \
    libexif-dev \
    libgsf-1-dev \
    liborc-0.4-dev \
    liblcms2-dev

ARG LIBAOM_VERSION=2.0.0
ARG LIBX265_VERSION=3.4
ARG LIBDE265_VERSION=1.0.7
ARG LIBHEIF_VERSION=1.9.1
ARG MOZJPEG_VERSION=3.3.1
ARG LIBVIPS_VERSION=8.10.1

ARG LIBAOM_URL=https://github.com/jbeich/aom
RUN mkdir -p ~/ffmpeg_sources/libaom \
    && cd ~/ffmpeg_sources/libaom \
    && curl -L -O ${LIBAOM_URL}/archive/v${LIBAOM_VERSION}.tar.gz \
    && tar xzf v${LIBAOM_VERSION}.tar.gz \
    && cmake ./aom-${LIBAOM_VERSION} -DBUILD_SHARED_LIBS=1 \
    && make \
    && make install

ARG LIBX265_URL=https://github.com/videolan/x265/archive
RUN cd ~/ffmpeg_sources \
    && curl -L -O ${LIBX265_URL}/${LIBX265_VERSION}.tar.gz \
    && tar xzf ${LIBX265_VERSION}.tar.gz \
    && cd x265-${LIBX265_VERSION}/build/linux \
    && cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$HOME/ffmpeg_build" -DENABLE_SHARED:bool=off ../../source \
    && make \
    && make install

WORKDIR /usr/local/src

ARG MOZJPEG_URL=https://github.com/mozilla/mozjpeg/archive
ARG VIPS_URL=https://github.com/libvips/libvips/releases/download
ARG LIBDE265_URL=https://github.com/strukturag/libde265/releases/download/v${LIBDE265_VERSION}
ARG LIBHEIF_URL=https://github.com/strukturag/libheif/releases/download/v${LIBHEIF_VERSION}

ADD ${MOZJPEG_URL}/v${MOZJPEG_VERSION}.tar.gz \
    ${VIPS_URL}/v${LIBVIPS_VERSION}/vips-${LIBVIPS_VERSION}.tar.gz \
    ${LIBDE265_URL}/libde265-${LIBDE265_VERSION}.tar.gz \
    ${LIBHEIF_URL}/libheif-${LIBHEIF_VERSION}.tar.gz \
    /usr/local/src/

RUN tar xzf libde265-${LIBDE265_VERSION}.tar.gz \
    && cd libde265-${LIBDE265_VERSION} \
    && ./configure --disable-dec265 --disable-sherlock265 \
    && make V=0 \
    && make install

RUN tar xzf libheif-${LIBHEIF_VERSION}.tar.gz \
    && cd libheif-${LIBHEIF_VERSION} \
    && ./configure \
    && make \
    && make install

RUN tar xzf v${MOZJPEG_VERSION}.tar.gz \
    && cd mozjpeg-${MOZJPEG_VERSION} \
    && aclocal \
    && autoconf \
    && autoheader \
    && libtoolize \
    && automake --add-missing \
    && ./configure \
    && make -j4 V=0 \
    && make install libdir=/usr/local/lib/ prefix=/usr \
    && cp jpegint.h /usr/include/jpegint.h

# ldd node_modules/sharp/build/Release/sharp.node
RUN tar xzf vips-${LIBVIPS_VERSION}.tar.gz \
    && cd vips-${LIBVIPS_VERSION} \
    && CFLAGS=-O3 CXXFLAGS=-O3 ./configure \
        --without-magick --without-pangoft2 --without-ppm \
        --without-analyze --without-radiance --without-OpenEXR \
        --with-jpeg-includes=/opt/mozjpeg/include \
        --with-jpeg-libraries=/opt/mozjpeg/lib64 \
    && make V=0 \
    && make install

WORKDIR /usr/src/app
RUN echo "/usr/local/lib" >> /etc/ld.so.conf.d/usrlocal.conf && ldconfig -v

RUN \
  # Clean up
  apt-get remove -y automake curl build-essential && \
  apt-get autoremove -y && \
  apt-get autoclean && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
