# Image Search API V2.0

<div class="card-img" align="center">
  <img src="https://wme-image-search-api.herokuapp.com/img/google-api.png" width=200 alt="Google Logo">
</div>

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
### Image Search
**Endpoint:**  
```/api/search/```

**Method:**  
```POST```

**Body**  
```
{ 
  search: SEARCHTERM,
  offset: ENTERNUMBER 
}
```

**Example:**
[Image Search Demo](https://wme-image-search-api.herokuapp.com/#search-image)

---
### Search History:
**Endpoint:**  
```/api/search/history```

**Method:**  
```GET```

**Example:**
[Search History Demo](https://wme-image-search-api.herokuapp.com/#search-history)

---
### Search Individual Record:
**Endpoint:**  
```/api/search/:id```

**Method:**  
```GET```

**Parameters:**  
```id=RECORDNUMBER```  

**Example:**  
```https://wme-image-search-api.herokuapp.com/api/search/3```

---
### Update Individual Record:
**Endpoint:**  
```/api/search/:id```

**Method:**  
```PUT```

**Parameters:**  
```id=RECORDNUMBER```  
```search=SEARCHTERM```  
```offset=ENTERNUMBER```

**Example:**  
```https://wme-image-search-api.herokuapp.com/api/search/2/?search=batman&offset=6```

---
### Delete Individual Record:
**Endpoint:**  
```/api/search/:id```

**Method:**  
```DELETE```

**Parameters:**  
```id=RECORDNUMBER```  

**Example:**  
```https://wme-image-search-api.herokuapp.com/api/search/3```

