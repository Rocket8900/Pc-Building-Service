FROM python:3-slim
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ./pc_order.py .
COPY ./wait-for-it.sh .
RUN chmod +x ./wait-for-it.sh
CMD [ "python", "./pc_order.py" ]
