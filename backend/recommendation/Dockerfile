FROM python:3.9.13
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ./recommendation.py .
CMD [ "python", "./recommendation.py" ]
ENV DGLBACKEND=pytorch