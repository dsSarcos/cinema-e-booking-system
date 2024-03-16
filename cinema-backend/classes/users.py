
class user:
    def __init__(self):
        self.userId = 0
        self.firstName = ""
        self.lastName = ""
        self.email = ""
        self.password = ""
        self.phoneNum = ""
        self.isRegistered = None
        self.homeAdd = None
        self.paymentInfo = []

# customer class, which is the logged in user
class customer(user):
    def __init__(self):
        self.something = ""
        super().__init__()
    
    # Set the attributes to whatever is in the database.
    def setInfomation(self):
        # self.userId = 
        # self.firstName = 
        # ...
        return   

    # Return whether the user is registered for promotions.
    def getIsRegistered(self):
        return self.isRegistered

    # Delete the account and all of its information.
    def deleteAccount(self):
        # Remove the account from all tables, destroy any payment info and address classes.
        return
    

class admin(user):
    def __init__(self):
        self.something = ""
        super().__init__()
