# Cinema Backend
Backend. Potato

## Getting Setup Locally
### Installing Dependencies
Installing packages you need to run the code.
1. Setup `virtualenv` by running the command `python3 -m venv venv`
2. Run `source venv/bin/activate`
3. Run `pip install -r requirements.txt`

More information about setting up virtualenv: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/

### Starting Server
Run `python main.py` and your server should now be running at 
http://127.0.0.1:5000.

To test that the server is running, try going to this URL http://127.0.0.1:5000/api/users. You should see
data that looks like this
```JSON
[
  {
    "Email": "admin@gmail.com",
    "FirstName": "admin",
    "ID": 1,
    "IsAdmin": 1,
    "LastName": "admin",
    "Password": "password",
    "UserID": "admin"
  },
  {
    "Email": "user@gmail.com",
    "FirstName": "user",
    "ID": 2,
    "IsAdmin": 0,
    "LastName": "user",
    "Password": "password",
    "UserID": "user"
  },
  {
    "Email": "trash@gmail.com",
    "FirstName": "Forky",
    "ID": 3,
    "IsAdmin": 0,
    "LastName": "Anderson",
    "Password": "imtrash!",
    "UserID": "trash"
  },
  {
    "Email": "sheriff@gmail.com",
    "FirstName": "Woody",
    "ID": 4,
    "IsAdmin": 1,
    "LastName": "Pride",
    "Password": "uratoy!",
    "UserID": "sheriffwoody"
  },
  {
    "Email": "spaceranger@gmail.com",
    "FirstName": "Buzz",
    "ID": 5,
    "IsAdmin": 0,
    "LastName": "Lightyear",
    "Password": "2infinity&beyond!",
    "UserID": "rangerbuzz"
  },
  {
    "Email": "hamm@gmail.com",
    "FirstName": "Swine",
    "ID": 6,
    "IsAdmin": 0,
    "LastName": "Uncultured",
    "Password": "piggybank!",
    "UserID": "hamm"
  }
]
```