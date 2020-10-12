FROM node:lts

# hadolint ignore=DL3008,DL3009
RUN apt-get update && apt-get --no-install-recommends -y install \
    curl \
    make \
    automake \
    autoconf \
    build-essential \
    pkg-config \
    libglib2.0-dev \
    libexpat1-dev \
    libwebp-dev \
    libpng-dev

# Install libde265
ARG LIBDE265_VERSION=1.0.7
ARG LIBDE265_URL=https://github.com/strukturag/libde265/releases/download/v${LIBDE265_VERSION}/libde265-${LIBDE265_VERSION}.tar.gz

RUN curl -L ${LIBDE265_URL} > /tmp/libde265.tar.gz \
    && tar xzf /tmp/libde265.tar.gz -C /usr/local/src

WORKDIR /usr/local/src/libde265-${LIBDE265_VERSION}
RUN ./configure --disable-dec265 --disable-sherlock265 \
    && make V=0 \
    && make install

# Install libheif
ARG LIBHEIF_VERSION=1.9.1
ARG LIBHEIF_URL=https://github.com/strukturag/libheif/releases/download/v${LIBHEIF_VERSION}/libheif-${LIBHEIF_VERSION}.tar.gz

RUN curl -L ${LIBHEIF_URL} > /tmp/libheif.tar.gz \
    && tar xzf /tmp/libheif.tar.gz -C /usr/local/src

WORKDIR /usr/local/src/libheif-${LIBHEIF_VERSION}
RUN ./autogen.sh \
    && ./configure \
    && make \
    && make install

# hadolint ignore=DL3008,DL3009
RUN apt-get --no-install-recommends -y install \
    gobject-introspection \
    gtk-doc-tools \
    gobject-introspection \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    libfftw3-dev \
    libexif-dev \
    libpng-dev \
    libtiff5-dev \
    libexpat1-dev \
    libcfitsio-dev \
    libgsl-dev \
    libmatio-dev \
    libnifti-dev \
    liborc-0.4-dev \
    liblcms2-dev \
    libpoppler-glib-dev \
    librsvg2-dev \
    libgif-dev \
    libopenexr-dev \
    libpango1.0-dev \
    libgsf-1-dev \
    libopenslide-dev \
    libffi-dev

# Install libvips
ARG LIBVIPS_VERSION=8.10.1
ARG LIBVIPS_URL=https://github.com/libvips/libvips/releases/download/v${LIBVIPS_VERSION}/vips-${LIBVIPS_VERSION}.tar.gz

RUN curl -L ${LIBVIPS_URL} > /tmp/vips.tar.gz \
    && tar xvf /tmp/vips.tar.gz -C /usr/local/src

WORKDIR /usr/local/src/vips-${LIBVIPS_VERSION}
RUN CFLAGS=-O3 CXXFLAGS=-O3 ./configure \
    && make V=0 \
    && make install \
    && ldconfig


WORKDIR /usr/src/app
RUN echo "/usr/local/lib" >> /etc/ld.so.conf.d/usrlocal.conf && ldconfig -v

RUN \
  # Clean up
  apt-get remove -y automake curl build-essential && \
  apt-get autoremove -y && \
  apt-get autoclean && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
