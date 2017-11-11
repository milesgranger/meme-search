FROM debian:stretch-slim

RUN apt update \
    && apt install -y \
        wget \
        build-essential

# Setup python env
RUN wget https://repo.continuum.io/miniconda/Miniconda3-4.3.30-Linux-x86_64.sh -O miniconda.sh \
    && bash miniconda.sh -bfp /opt/anaconda \
    && rm miniconda.sh

ENV PATH /opt/anaconda/bin:$PATH
WORKDIR /workdir

RUN pip install --upgrade pip flask boto3 redis "elasticsearch>=5.0.0,<6.0.0" s3fs
ENV PYTHONPATH /workdir

EXPOSE 8000