# ndelius-wrapper
Fake ndelius for wrapping ndelius new tech apps

## Build

Ensure you are using Node [lts/dubnium](https://nodejs.org/download/release/latest-dubnium/)

```
npm i
```

## Run
```
NEW_TECH_BASE_URL=http://<new tech app host>/ npm start

e.g. NEW_TECH_BASE_URL=http://localhost:9000/ npm start
e.g. ELASTIC_SEARCH_URL=http://localhost:9200 NEW_TECH_BASE_URL=http://localhost:9000/ npm start
```


