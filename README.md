# Image Search API

A REST API that processes image searches using the Google custom search engine

---
### Development
    * API is built using Node/Koa and handles data creation, updates, and retrieval
    * Backend is a PostgreSQL database that stores search history

---
### User Stories:
    1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
    2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
    3. I can get a list of the most recently submitted search strings.

---
### Usage:
#### Image Search
**Endpoint:**  
```/api/search/:search*```

**Method:**  
```POST```

**Parameters:**  
```search=SEARCHTERM```  
```offset=ENTERNUMBER```

**Example:**  
```https://localhost/api/search/?search=avengers&offset=2```

---
##### Search History:
**Endpoint:**  
```/api/search/history```

**Method:**  
```GET```

---
##### Search Individual Record:
**Endpoint:**  
```/api/search/:id```

**Method:**  
```GET```

**Parameters:**  
```id=RECORDNUMBER```  

**Example:**  
```https://localhost/api/search/3```

---
##### Update Individual Record:
**Endpoint:**  
```/api/search/:id```

**Method:**  
```PUT```

**Parameters:**  
```id=RECORDNUMBER```  
```search=SEARCHTERM```  
```offset=ENTERNUMBER```

**Example:**  
```https://localhost/api/search/2/?search=batman&offset=6```

---
##### Delete Individual Record:
**Endpoint:**  
```/api/search/:id```

**Method:**  
```DELETE```

**Parameters:**  
```id=RECORDNUMBER```  

**Example:**  
```https://localhost/api/search/3```

