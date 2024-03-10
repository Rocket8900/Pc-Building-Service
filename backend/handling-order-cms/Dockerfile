FROM python:3-slim
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5100
CMD [ "python3", "./order_handling_cms.py" ]

