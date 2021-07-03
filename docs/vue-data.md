# DATA fields

```
page: {
    state: {
        isLoading: false,
    }
},

form: {
   
    data: {
        firstName: 'Willem',
        lastName: 'example',
    },

    state: {
      isLoading: false,
      isSubmitting: false,
    },
    
    messages : {
      success : '',
      warning   : '',
      error   : '',
    },
    
    apiErrors: {
        errors: "['firstname' => ['error1', 'error2']
    }
        
    routes: {
        open: 'routename'
    }
    
    urls: {
      create: '',
      read: '',
      update: '',
      delete: '',
    },
    

}
```

form.data : data to post

```
table: {
    searchInput: "",
    values: {},
    headers: {}
    
```
