#import bcrypt
from query_db import connect_to_db

from passlib.hash import bcrypt, cisco_type7

from uc_movieposters import ant_man_and_the_wasp_quantumania_img, cocaine_bear_img, inside_img, crouching_tiger_img, jesus_revolution_img, emily_img, creed_iii_img, operation_fortune_img, scream_vi_3d_img, scream_vi_img, dungeons_dragons_img, fast_x_img
from cs_movieposters import avatar_the_way_of_water_img, knock_at_the_cabin_img, magic_mike_img, eighty_for_brady_img, titanic_img, megan_img, puss_in_boots_img, pathaan_img, the_amazing_maurice_img, a_man_called_otto_img, missing_img, consecration_img

conn = connect_to_db()

def executeAndCommit(conn, query):
    conn.execute(query)
    conn.commit()

"""
Creates User table and populates User table with User data.
"""
executeAndCommit(conn, '''DROP table IF EXISTS User''')
executeAndCommit(conn, '''CREATE TABLE User (
    ID INTEGER PRIMARY KEY,
    LastName TEXT NOT NULL,
    FirstName TEXT NOT NULL,
    Email TEXT NOT NULL,
    Password TEXT NOT NULL,
    PhoneNumber TEXT DEFAULT NULL,
    IsAdmin INT DEFAULT NULL,
    IsActive INT DEFAULT 0,
    IsRegistered INT DEFAULT 0)''')
print("User Table created successfully")

def hashData(data):
    # converting data to array of bytes
    bytes = data.encode('utf-8')

    # generating the salt
    #salt = bcrypt.gensalt()

    # Hashing the data
    hashedData = bcrypt.encrypt(bytes)
    return hashedData

def encodeHash(data):
    #bytes = data.encode('utf-8')

    hashed = cisco_type7.hash(data)
    
    return hashed

def decodeHash(data):
    data = cisco_type7.decode(data)
    return data

password1 = hashData('Password1')
password2 = hashData('password')
password3 = hashData('password')
password4 = hashData('password')
password5 = hashData('imforky!')
password6 = hashData('imwoody!')

executeAndCommit(conn, """INSERT INTO User (LastName, FirstName, Email, Password, PhoneNumber , IsAdmin, IsActive, IsRegistered) VALUES
                ('LastName1', 'FirstName1', 'Email1@gmail.com', 'Password1', '123-456-789' , 1, 0, 1),
                ('admin', 'admin', 'admin@gmail.com', 'password', '', 1, 1, 1),
                ('user', 'user', 'user@gmail.com', 'password', '555-555-5555', 0, 1, 1),
                ('user1', 'user1', 'user1@gmail.com', 'password', '', 0, 0, 1),
                ('Anderson', 'Forky', 'forky@gmail.com', 'imforky!', '', 0, 0, 1),
                ('Pride', 'Woody', 'sheriff@gmail.com', 'imwoody!', '', 1, 0, 1)
             """)
cur = conn.cursor()
cur.execute("UPDATE User SET Password = ? WHERE ID =?",
                    (password1, 1))
cur.execute("UPDATE User SET Password = ? WHERE ID =?",
                    (password2, 2))
cur.execute("UPDATE User SET Password = ? WHERE ID =?",
                    (password3, 3))
cur.execute("UPDATE User SET Password = ? WHERE ID =?",
                    (password3, 3))
cur.execute("UPDATE User SET Password = ? WHERE ID =?",
                    (password4, 4))
cur.execute("UPDATE User SET Password = ? WHERE ID =?",
                    (password5, 5))
cur.execute("UPDATE User SET Password = ? WHERE ID =?",
                    (password6, 6))
conn.commit()

print("User Table populated")

"""
Creates Movie table and populates Movie table with Movie data.
"""
executeAndCommit(conn, '''DROP table IF EXISTS Movie''')
executeAndCommit(conn, '''CREATE TABLE Movie (
    ID INTEGER PRIMARY KEY,
    Title TEXT NOT NULL,
    Category TEXT NOT NULL,
    Cast TEXT NOT NULL,
    Director TEXT NOT NULL,
    Producer TEXT NOT NULL,
    Synopsis TEXT NOT NULL,
    Runtime TEXT NOT NULL,
    Reviews TEXT NOT NULL,
    MoviePoster BLOB,
    Trailer TEXT NOT NULL,
    RatingCode TEXT NOT NULL,
    MovieState TEXT NOT NULL,
    MoviePrice TEXT NOT NULL)''')
print("Movie Table created successfully")

executeAndCommit(conn, """INSERT INTO Movie (Title, Category, Cast, Director, Producer, Synopsis, Runtime, Reviews, MoviePoster, Trailer, RatingCode, MovieState, MoviePrice) VALUES
                ("Magic Mike's Last Dance", 'Comedy, Drama', 'Channing Tatum, Salma Hayek, Ayub Khan-Din', 'Steven Soderbergh', 'Nick Wechsler, Gregory Jacobs, Channing Tatum, Reid Carolin, Peter Kiernan', "Mike takes to the stage again, following a business deal that went bust, leaving him broke and taking bartender gigs in Florida. Mike heads to London with a wealthy socialite who lures him with an offer he can't refuse.", '1h 52m', '209', 'magic-mikes-last-dance.jpg', 'https://www.youtube.com/watch?v=pBIGdw-BRxw', 'R', 'CURRENT', '10.95'),
                ("Titanic (25th Anniversary)", 'Drama, History, Romance', 'Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates, Frances Fisher, Gloria Stuart', 'James Cameron', 'James Cameron, Jon Landau', "In celebration of its 25th anniversary, a remastered version of James Cameron's multi-Academy Award®-winning 'Titanic' will be re-released to theaters in 3D 4K HDR and high-frame rate. With a cast headed by Oscar® winners Leonardo DiCaprio and Kate Winslet, the film is an epic, action-packed romance set against the ill-fated maiden voyage of the 'unsinkable' Titanic, at the time, the largest moving object ever built.", '3h 15m', '250', 'titanic-25th-anniversary.jpg', 'https://www.youtube.com/watch?v=I7c1etV7D7g', 'PG-13', 'CURRENT', '10.95'),
                ("Knock at the Cabin", 'Mystery & Thriller, Drama', 'Dave Bautista, Jonathan Groff, Ben Aldridge, Nikki Amuka-Bird, Kristen Cui, Abby Quinn', 'M. Night Shyamalan', 'M. Night Shyamalan, Marc Bienstock, Ashwin Rajan', 'While vacationing at a remote cabin, a young girl and her parents are taken hostage by four armed strangers who demand that the family make an unthinkable choice to avert the apocalypse. With limited access to the outside world, the family must decide what they believe before all is lost.', '1h 40m', '319', 'knock-at-the-cabin.jpg', 'https://www.youtube.com/watch?v=0wiBHEACNHs', 'R', 'CURRENT', '10.95'),
                ("80 for Brady", 'Comedy', 'Lily Tomlin, Jane Fonda, Rita Moreno, Sally Field, Tom Brady, Billy Porter', 'Kyle Marvin', 'Donna Gigliotti, Tom Brady', '80 FOR BRADY is inspired by the true story of four best friends living life to the fullest when they take a wild trip to the 2017 Super Bowl LI to see their hero Tom Brady play.', '1h 38m', '122', '80-for-brady.jpg', 'https://www.youtube.com/watch?v=-UeGXB2NjR8', 'PG-13', 'CURRENT', '10.95'),
                ("Avatar: The Way of Water", 'Sci-fi, Adventure, Action, Fantasy', 'Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang, Cliff Curtis, Joel David Moore', 'James Cameron', 'James Cameron, Jon Landau', 'Set more than a decade after the events of the first film, "Avatar: The Way of Water" begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.', '3h 12m', '433', 'avatar-the-way-of-water.jpg', 'https://www.youtube.com/watch?v=d9MyW72ELq0', 'PG-13', 'CURRENT', '10.95'),
                ("M3GAN", 'Horror, Mystery & thriller, Sci-fi, Comedy', 'Allison Williams, Violet McGraw, Ronny Chieng, Brian Jordan Alvarez, Jen Van Epps, Lori Dungey', 'Gerard Johnstone', 'Jason Blum, James Wan, Couper Samuelson', "M3GAN is a marvel of artificial intelligence, a life-like doll programmed to be a child's greatest companion and a parent's greatest ally. Designed by brilliant toy-company roboticist Gemma (Get Out's Allison Williams), M3GAN can listen and watch and learn as she becomes friend and teacher, playmate and protector, for the child she is bonded to. When Gemma suddenly becomes the caretaker of her orphaned 8-year-old niece, Cady (Violet McGraw, The Haunting of Hill House), Gemma's unsure and unprepared to be a parent. Under intense pressure at work, Gemma decides to pair her M3GAN prototype with Cady in an attempt to resolve both problems--a decision that will have unimaginable consequences.", '1h 42m', '304', 'm3gan.jpg', 'https://www.youtube.com/watch?v=BRb4U99OU80', 'PG-13', 'CURRENT', '10.95'),
                ("Puss in Boots: The Last Wish", 'Kids & family, Comedy, Adventure, Animation', 'Antonio Banderas, Salma Hayek, Olivia Colman, Harvey Guillen, Samson Kayo, Wagner Moura', 'Joel Crawford', 'Mark Swift', "This fall, everyone's favorite leche-loving, swashbuckling, fear-defying feline returns. For the first time in more than a decade, DreamWorks Animation presents a new adventure in the Shrek universe as daring outlaw Puss in Boots discovers that his passion for peril and disregard for safety have taken their toll. Puss has burned through eight of his nine lives, though he lost count along the way. Getting those lives back will send Puss in Boots on his grandest quest yet. Academy Award® nominee Antonio Banderas returns as the voice of the notorious PiB as he embarks on an epic journey into the Black Forest to find the mythical Wishing Star and restore his lost lives. But with only one life left, Puss will have to humble himself and ask for help from his former partner and nemesis: the captivating Kitty Soft Paws (Oscar® nominee Salma Hayek). In their quest, Puss and Kitty will be aided--against their better judgment--by a ratty, chatty, relentlessly cheerful mutt, Perro (Harvey Guillén, What We Do in the Shadows). Together, our trio of heroes will have to stay one step ahead of Goldilocks (Oscar® nominee Florence Pugh, Black Widow) and the Three Bears Crime Family, 'Big' Jack Horner (Emmy winner John Mulaney, Big Mouth) and terrifying bounty hunter, The Big Bad Wolf (Wagner Moura, Narcos).", '1h 42m', '304', 'puss-in-boots-the-last-wish.jpg', 'https://www.youtube.com/watch?v=Y5zqweZAEKI', 'PG-13', 'CURRENT', '10.95'),
                ("Pathaan (Hindi)", 'Action, Mystery & thriller, Romance', 'Shah Rukh Khan, Deepika Padukone, John Abraham', 'Siddharth Anand', 'Aditya Chopra, Alexander Dostal', "An undercover cop tries to take down a drug lord.", '2h 26m', '27', 'pathaan.png','https://www.youtube.com/watch?v=vqu4z34wENw','NR', 'CURRENT', '10.95'),
                ("The Amazing Maurice", 'Kids & family, Comedy, Animation', 'Hugh Laurie, Emilia Clarke, Himesh Patel, Gemma Arterton, David Thewlis, Hugh Bonneville', 'Toby Genkel, Florian Westermann', 'Julia Stuart, Emely Christians, Andrew Baker, Robert Chandler, Rob Wilkins', "Maurice is a streetwise ginger cat who comes up with a money-making scam by befriending a group of talking rats. When Maurice and the rodents reach the stricken town of Bad Blintz, they meet a bookworm named Malicia and their little con soon goes down the drain.", '1h 33m', '50', 'the-amazing-maurice.jpg','https://www.youtube.com/watch?v=fotvV-Ty9rU','PG', 'CURRENT', '10.95'),
                ("A Man Called Otto", 'Comedy, Drama', 'Tom Hanks, Mack Bayda, Mariana Treviño, Rachel Keller, Manuel Garcia-Rulfo, Cameron Britton', 'Marc Forster', 'Fredrik Wikström, Rita Wilson, Tom Hanks, Gary Goetzman', "Maurice is a streetwise ginger cat who comes up with a money-making scam by befriending a group of talking rats. When Maurice and the rodents reach the stricken town of Bad Blintz, they meet a bookworm named Malicia and their little con soon goes down the drain.", '1h 33m', '200', 'a-man-called-otto.jpg','https://www.youtube.com/watch?v=fotvV-Ty9rU','PG', 'CURRENT', '10.95'),
                ("Missing", 'Comedy, Drama', 'Storm Reid, Joaquim de Almeida, Ken Leung, Amy Landecker, Daniel Henney, Nia Long', 'Will Merrick, Nicholas D. Johnson', 'Natalie Qasabian, Sev Ohanian, Aneesh Chaganty', "When her mother (Nia Long) disappears while on vacation in Colombia with her new boyfriend, June's (Storm Reid) search for answers is hindered by international red tape. Stuck thousands of miles away in Los Angeles, June creatively uses all the latest technology at her fingertips to try and find her before it's too late. But as she digs deeper, her digital sleuthing raises more questions than answers... and when June unravels secrets about her mom, she discovers that she never really knew her at all.", '1h 51m', '128', 'missing.jpg','https://www.youtube.com/watch?v=seBixtcx19E','PG-13', 'CURRENT', '10.95'),
                ("Consecration", 'Horror, Mystery & Thriller', 'Jena Malone, Danny Huston, Ian Pirie, Janet Suzman, Steffan Cennydd, Thoren Ferguson', 'Christopher Smith', 'Laurie Cook, Casey Herbert, Xavier Marchand, Jason Newmark', "In CONSECRATION, after the suspicious death of her brother, a priest, Grace (Jena Malone) goes to the Mount Saviour Convent in Scotland to find out what really happened. Once there, she uncovers murder, sacrilege and a disturbing truth about her own past.", '1h 51m', '57', 'consecration.jpg','https://www.youtube.com/watch?v=x3w3AXRS50w','R', 'CURRENT', '10.95'),
                ('Ant-Man and the Wasp: Quantumania', 'Action, Adventure', 'Paul Rudd, Evangeline Lilly, Michael Douglas, Michelle Pfeiffer, Jonathan Majors', 'Peyton Reed', 'Kevin Feige, Stephen Broussard', "Ant-Man and the Wasp find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that pushes them beyond the limits of what they thought was possible.", '2h 5m', '47', 'ant-man-and-the-wasp-quantumania.jpg', 'https://www.youtube.com/embed/ZlNFpri-Y40', 'PG-13', 'UPCOMING', '10.95'),
                ('Crouching Tiger, Hidden Dragon (Reissue)', 'Adventure, Action', 'Chow Yun-Fat, Michelle Yeoh, Zhang Ziyi, Chang Chen, Liang Hsiung, Cheng Pei-pei', 'Ang Lee', 'Li-Kong Hsu, William Kong, Ang Lee', "In 19th century Qing Dynasty China, a warrior (Chow Yun-Fat) gives his sword, Green Destiny, to his lover (Michelle Yeoh) to deliver to safe keeping, but it is stolen, and the chase is on to find it. The search leads to the House of Yu where the story takes on a whole different level.", '2h 0m', '168', 'crouching-tiger-hidden-dragon-reissue.jpg', 'https://www.youtube.com/watch?v=q-HrIQLdaNE', 'PG-13', 'UPCOMING', '10.95'),
                ('Jesus Revolution', 'Drama, History', 'Joel Courtney, Jonathan Roumie, Kimberly Williams-Paisley, Anna Grace Barlow, Kelsey Grammer, Nicholas Bishop', 'Jon Erwin, Brent McCorkle', 'Kevin Downes, Andrew Erwin, Jon Erwin, Greg Laurie, Josh Walsh, Daryl C. Lefever', "JESUS REVOLUTION is the story of one young hippie's quest in the 1970s for belonging and liberation that leads not only to peace, love, and rock and roll, but that sets into motion a new counterculture crusade--a Jesus Movement--changing the course of history. Inspired by a true movement, JESUS REVOLUTION tells the story of a young Greg Laurie (Joel Courtney) being raised by his struggling mother, Charlene (Kimberly Williams-Paisley) in the 1970s. Laurie and a sea of young people descend on sunny Southern California to redefine truth through all means of liberation. Inadvertently, Laurie meets Lonnie Frisbee (Jonathan Roumie), a charismatic hippie-street-preacher, and Pastor Chuck Smith (Kelsey Grammer) who have thrown open the doors of Smith's languishing church to a stream of wandering youth. What unfolds becomes the greatest spiritual awakening in American history. Rock and roll, newfound love, and a twist of faith lead to a JESUS REVOLUTION that turns one counterculture movement into a revival that changes the world.", '1h 59m', '47', 'jesus-revolution.jpg', 'https://www.youtube.com/watch?v=8vmHFvnjPDw', 'PG-13', 'UPCOMING', '10.95'),
                ('Cocaine Bear', 'Mystery & Thriller, Comedy', "Keri Russell, O'Shea Jackson Jr., Christian Convery, Alden Ehrenreich, Jesse Tyler Ferguson, Brooklynn Prince", 'Elizabeth Banks', 'Phil Lord, Chris Miller, Elizabeth Banks, Max Handelman, Brian Duffield, Aditya Sood, Matt Reilly, Christine Sun', "Inspired by the 1985 true story of a drug runner's plane crash, missing cocaine, and the black bear that ate it, this wild thriller finds an oddball group of cops, criminals, tourists and teens converging in a Georgia forest where a 500-pound apex predator has ingested a staggering amount of cocaine and gone on a coke-fueled rampage for more blow... and blood.", '1h 35m', '294', 'cocaine-bear.jpg', 'https://www.youtube.com/watch?v=e-I-YCy7yKY', 'R', 'UPCOMING', '10.95'),
                ('Emily', 'Biography, History, Drama, Romance', 'Emma Mackey, Fionn Whitehead, Oliver Jackson-Cohen, Alexandra Dowling, Amelia Gething, Gemma Jones', "Frances O'Connor", 'Piers Tempest, Robert Connolly, David Barron', "EMILY imagines Emily Brontë’s own Gothic story that inspired her seminal novel, 'Wuthering Heights.' Haunted by the death of her mother, Emily struggles within the confines of her family life and yearns for artistic and personal freedom, and so begins a journey to channel her creative potential into one of the greatest novels of all time.", '2h 10m', '126', 'emily.jpg', 'https://www.youtube.com/watch?v=xaL90sMAzbY', 'R', 'UPCOMING', '10.95'),
                ('Creed III', 'Drama, Action', 'Michael B. Jordan, Tessa Thompson, Jonathan Majors, Wood Harris, Mila Davis-Kent, Florian Munteanu', 'Michael B. Jordan', 'Irwin Winkler, Charles Winkler, William Chartoff, David Winkler, Ryan Coogler, Michael B. Jordan, Elizabeth Raposo, Jonathan Glickman, Sylvester Stallone', "After dominating the boxing world, Adonis Creed (Michael B. Jordan) has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Damian (Jonathan Majors), resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damian -- a fighter who has nothing to lose.", '1h 56m', '311', 'creed-iii.jpg', 'https://www.youtube.com/watch?v=AHmCH7iB_IM', 'PG-13', 'UPCOMING', '10.95'),
                ('Operation Fortune: Ruse de guerre', 'Action, Comedy, Mystery & Thriller', 'Jason Statham, Aubrey Plaza, Josh Hartnett, Cary Elwes, Bugzy Malone, Hugh Grant', 'Guy Ritchie', 'Ivan Atkinson, Bill Block, Steve Chasman, Guy Ritchie, Jason Statham', "In the film, super spy Orson Fortune (Jason Statham) must track down and stop the sale of a deadly new weapons technology wielded by billionaire arms broker Greg Simmonds (Hugh Grant). Reluctantly teamed with some of the world’s best operatives (Aubrey Plaza, Cary Elwes, Bugzy Malone), Fortune and his crew recruit Hollywood's biggest movie star Danny Francesco (Josh Hartnett) to help them on their globe-trotting undercover mission to save the world.", '1h 54m', '129', 'operation-fortune-ruse-de-guerre.jpg', 'https://www.youtube.com/watch?v=W8Sqk1GcqxY', 'R', 'UPCOMING', '10.95'),
                ('Scream VI 3D Fan Event', 'Horror, Suspense', 'Dermot Mulroney, Tony Revolori, Hayden Panettiere, Samara Weaving, Henry Czerny, Courteney Cox, Jenna Ortega, Melissa Barrera, Jasmin Savoy Brown, Mason Gooding, Liana Liberato, Jack Champion, Devyn Nekoda, Josh Segarra', 'Matt Bettinelli-Olpin, Tyler Gillett', 'William Sherak, James Vanderbilt, Paul Neinstein', "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.", '2h 3m', '275', 'scream-vi-3d-fan-event.jpg', 'https://www.youtube.com/watch?v=h74AXqw4Opc', 'R', 'UPCOMING', '10.95'),
                ('Inside', 'Drama', 'Willem Dafoe, Gene Bervoets, Eliza Stuyck, Josia Krug', 'Vasilis Katsoupis', 'Giorgos Karnavas, Marcos Kantis, Dries Phlypo', "INSIDE tells the story of Nemo, an art thief trapped in a New York penthouse after his heist doesn't go as planned. Locked inside with nothing but priceless works of art, he must use all his cunning and invention to survive.", '1h 45m', '92', 'inside.jpg', 'https://www.youtube.com/watch?v=DjODCllZj4w', 'R', 'UPCOMING', '10.95'),
                ('Scream VI', 'Horror, Suspense', 'Dermot Mulroney, Tony Revolori, Hayden Panettiere, Samara Weaving, Henry Czerny, Courteney Cox, Jenna Ortega, Melissa Barrera, Jasmin Savoy Brown, Mason Gooding, Liana Liberato, Jack Champion, Devyn Nekoda, Josh Segarra', 'Matt Bettinelli-Olpin, Tyler Gillett', 'William Sherak, James Vanderbilt, Paul Neinstein', "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.", '2h 3m', '275', 'scream-vi.jpg', 'https://www.youtube.com/watch?v=h74AXqw4Opc', 'R', 'UPCOMING', '10.95'),
                ('Dungeons & Dragons: Honor Among Thieves', 'Fantasy, Adventure, Action, Comedy', 'Chris Pine, Hugh Grant, Michelle Rodriguez, Justice Smith, Sophia Lillis, Chloe Coleman, Regé-Jean Page, Daisy Head', 'Jonathan Goldstein, John Francis Daley', 'Jeremy Latcham, Brian Goldner, Nick Meyer', "A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people. Dungeons & Dragons: Honor Among Thieves brings the rich world and playful spirit of the legendary roleplaying game to the big screen in a hilarious and action-packed adventure", '2h 14m', '237', 'dungeons-dragons-honor-among-thieves.jpg', 'https://www.youtube.com/watch?v=IiMinixSXII', 'PG-13', 'UPCOMING', '10.95'),
                ('Fast X', 'Action, Adventure', 'Vin Diesel, Brie Larson, Michelle Rodriguez, Jason Momoa, Tyrese Gibson, Sung Kang, Scott Eastwood, Daniela Melchior, Chris “Ludacris” Bridges, John West Jr.', 'Louis Leterrier', 'Neal H. Moritz, Vin Diesel, Justin Lin, Jeff Kirschenbaum, Samantha Vincent', "Over many missions and against impossible odds, Dom Toretto (Vin Diesel) and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything--and everyone--that Dom loves, forever.", '2h 10m', '0', 'fast-x.jpg', 'https://www.youtube.com/watch?v=J5cPX-CJZFU', 'PG-13', 'UPCOMING', '10.95')
                """)
print("Movie Table populated")

MoviePoster1 = magic_mike_img
MoviePoster2 = titanic_img
MoviePoster3 = knock_at_the_cabin_img
MoviePoster4 = eighty_for_brady_img
MoviePoster5 = avatar_the_way_of_water_img
MoviePoster6 = megan_img
MoviePoster7 = puss_in_boots_img
MoviePoster8 = pathaan_img
MoviePoster9 = the_amazing_maurice_img
MoviePoster10 = a_man_called_otto_img
MoviePoster11 = missing_img
MoviePoster12 = consecration_img
MoviePoster13 = ant_man_and_the_wasp_quantumania_img
MoviePoster14 = crouching_tiger_img
MoviePoster15 = jesus_revolution_img
MoviePoster16 = cocaine_bear_img
MoviePoster17 = emily_img
MoviePoster18 = creed_iii_img
MoviePoster19 = operation_fortune_img
MoviePoster20 = scream_vi_3d_img
MoviePoster21 = inside_img
MoviePoster22 = scream_vi_img
MoviePoster23 = dungeons_dragons_img
MoviePoster24 = fast_x_img

cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster1, 1))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster2, 2))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster3, 3))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster4, 4))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster5, 5))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster6, 6))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster7, 7))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster8, 8))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster9, 9))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster10, 10))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster11, 11))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster12, 12))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster13, 13))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster14, 14))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster15, 15))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster16, 16))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster17, 17))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster18, 18))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster19, 19))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster20, 20))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster21, 21))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster22, 22))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster23, 23))
cur.execute("UPDATE Movie SET MoviePoster = ? WHERE ID =?", (MoviePoster24, 24))

"""
Creates PaymentInfo table.
"""

executeAndCommit(conn, '''DROP table IF EXISTS PaymentInfo''')
executeAndCommit(conn, '''CREATE TABLE PaymentInfo (
    ID INTEGER PRIMARY KEY,
    HomeAddr TEXT DEFAULT NULL,
    HomeCity TEXT DEFAULT NULL,
    HomeState TEXT DEFAULT NULL,
    HomeZip TEXT DEFAULT NULL,
    BillingAddr1 TEXT DEFAULT NULL,
    BillingCity1 TEXT DEFAULT NULL,
    BillingState1 TEXT DEFAULT NULL,
    BillingZip1 TEXT DEFAULT NULL,
    BillingAddr2 TEXT DEFAULT NULL,
    BillingCity2 TEXT DEFAULT NULL,
    BillingState2 TEXT DEFAULT NULL,
    BillingZip2 TEXT DEFAULT NULL,
    BillingAddr3 TEXT DEFAULT NULL,
    BillingCity3 TEXT DEFAULT NULL,
    BillingState3 TEXT DEFAULT NULL,
    BillingZip3 TEXT DEFAULT NULL,
    UserID INTEGER,
    CardNumber1 TEXT DEFAULT NULL,
    ExpMonth1 TEXT DEFAULT NULL,
    ExpYear1 TEXT DEFAULT NULL,
    CardNumber2 TEXT DEFAULT NULL,
    ExpMonth2 TEXT DEFAULT NULL,
    ExpYear2 TEXT DEFAULT NULL,
    CardNumber3 TEXT DEFAULT NULL,
    ExpMonth3 TEXT DEFAULT NULL,
    ExpYear3 TEXT DEFAULT NULL,
    FOREIGN KEY(UserID) REFERENCES User(ID)
    )''')
print("PaymentInfo Table created successfully")

# executeAndCommit(conn, """INSERT INTO PaymentInfo (BillingAddr, BillingCity, BillingState, BillingZip, UserID, CardNumber1, ExpMonth1, ExpYear1, CardNumber2, ExpMonth2, ExpYear2, CardNumber3, ExpMonth3, ExpYear3 ) VALUES
#                 ('1 Street', 'Athens', 'GA', '30605' ,'1', '123456789', '10', '23', '2222222222', '11', '24', '3333333333', '01', '25' ),
#                 ('2 Street', 'Atlanta', 'GA', '1000' ,'2', '222222222', '12', '24', '4444444444444', '11', '24', '555555555555', '01', '25'),
#                 ('3 Street', 'Honolulu', 'HI', '2000' ,'3', '5555555', '10', '22', '1111111111111', '11', '24', '555555555555', '01', '25'),
#                 ('4 Street', 'Seattle', 'WA', '5000' ,'4', '88888888', '03', '24', '99999999999', '11', '24', '555555555555', '01', '25')
#              """)

executeAndCommit(conn, """INSERT INTO PaymentInfo (BillingAddr1, BillingCity1, BillingState1, BillingZip1, UserID, CardNumber1, ExpMonth1,ExpYear1, HomeAddr, HomeCity, HomeState, HomeZip) VALUES
                ('3 Street', 'Honolulu', 'HI', '2000' ,'3', '5555555', '10', '22', '1 Street', 'Athens', 'GA', '30605' )
            """)

HomeAddr = encodeHash('1 Street')
HomeCity = encodeHash('Athens')
HomeState = encodeHash('GA')
HomeZip = encodeHash('30605')
CardNumber1 = encodeHash('55555555')
ExpMonth1 = encodeHash('10!')
ExpYear1 = encodeHash('23!')
BillingAddr1 = encodeHash('4 Street')
BillingCity1 = encodeHash('Honolulu')
BillingState1 = encodeHash('WA')
BillingZip1 = encodeHash('5000')
cur.execute("UPDATE PaymentInfo SET HomeAddr = ?, HomeCity = ?, HomeState = ?, HomeZip = ?, CardNumber1 = ?, ExpMonth1 = ?, ExpYear1 = ?, BillingAddr1 = ?, BillingCity1 = ?, BillingState1 = ?, BillingZip1 = ? WHERE UserID = ?",
            (HomeAddr, HomeCity, HomeState, HomeZip, CardNumber1, ExpMonth1, ExpYear1, BillingAddr1, BillingCity1, BillingState1, BillingZip1, 3))
# CardNumber2 = encodeHash('2222222222!')
# ExpMonth2 = encodeHash('11')
# ExpYear2 = encodeHash('24')
# CardNumber3 = encodeHash('3333333333')
# ExpMonth3 = encodeHash('01')
# ExpYear3 = encodeHash('25')
# cur.execute("UPDATE PaymentInfo SET BillingAddr = ?, BillingCity = ?, BillingState = ?, BillingZip = ?, CardNumber1 = ?, ExpMonth1 = ?, ExpYear1 = ?, CardNumber2 = ?, ExpMonth2 = ?, ExpYear2 = ?, CardNumber3 = ?, ExpMonth3 = ?, ExpYear3 = ? WHERE UserID =?",
#                     (BillingAddr, BillingCity, BillingState, BillingZip, CardNumber1, ExpMonth1, ExpYear1, CardNumber2, ExpMonth2, ExpYear2, CardNumber3, ExpMonth3, ExpYear3, 1))

# BillingAddr = encodeHash('2 Street')
# BillingCity = encodeHash('Atlanta')
# BillingState = encodeHash('GA')
# BillingZip = encodeHash('1000')
# CardNumber1 = encodeHash('222222222')
# ExpMonth1 = encodeHash('12')
# ExpYear1 = encodeHash('24')
# CardNumber2 = encodeHash('4444444444444')
# ExpMonth2 = encodeHash('11')
# ExpYear2 = encodeHash('24')
# CardNumber3 = encodeHash('555555555555')
# ExpMonth3 = encodeHash('01')
# ExpYear3 = encodeHash('25')
# cur.execute("UPDATE PaymentInfo SET BillingAddr = ?, BillingCity = ?, BillingState = ?, BillingZip = ?, CardNumber1 = ?, ExpMonth1 = ?, ExpYear1 = ?, CardNumber2 = ?, ExpMonth2 = ?, ExpYear2 = ?, CardNumber3 = ?, ExpMonth3 = ?, ExpYear3 = ? WHERE UserID =?",
#                     (BillingAddr, BillingCity, BillingState, BillingZip, CardNumber1, ExpMonth1, ExpYear1, CardNumber2, ExpMonth2, ExpYear2, CardNumber3, ExpMonth3, ExpYear3, 2))


# CardNumber1 = encodeHash('222222222')
# ExpMonth1 = encodeHash('10')
# ExpYear1 = encodeHash('22')
# CardNumber2 = encodeHash('1111111111111')
# ExpMonth2 = encodeHash('11')
# ExpYear2 = encodeHash('24')
# CardNumber3 = encodeHash('555555555555')
# ExpMonth3 = encodeHash('01')
# ExpYear3 = encodeHash('25')
# cur.execute("UPDATE PaymentInfo SET BillingAddr = ?, BillingCity = ?, BillingState = ?, BillingZip = ?, CardNumber1 = ?, ExpMonth1 = ?, ExpYear1 = ?, CardNumber2 = ?, ExpMonth2 = ?, ExpYear2 = ?, CardNumber3 = ?, ExpMonth3 = ?, ExpYear3 = ? WHERE UserID =?",
#                     (BillingAddr, BillingCity, BillingState, BillingZip, CardNumber1, ExpMonth1, ExpYear1, CardNumber2, ExpMonth2, ExpYear2, CardNumber3, ExpMonth3, ExpYear3, 3))

# BillingAddr = encodeHash('3 Street')
# BillingCity = encodeHash('Seattle')
# BillingState = encodeHash('HI')
# BillingZip = encodeHash('2000')
# CardNumber1 = encodeHash('88888888')
# ExpMonth1 = encodeHash('03')
# ExpYear1 = encodeHash('24')
# CardNumber2 = encodeHash('99999999999')
# ExpMonth2 = encodeHash('11')
# ExpYear2 = encodeHash('24')
# CardNumber3 = encodeHash('555555555555')
# ExpMonth3 = encodeHash('01')
# ExpYear3 = encodeHash('25')
# cur.execute("UPDATE PaymentInfo SET BillingAddr = ?, BillingCity = ?, BillingState = ?, BillingZip = ?, CardNumber1 = ?, ExpMonth1 = ?, ExpYear1 = ?, CardNumber2 = ?, ExpMonth2 = ?, ExpYear2 = ?, CardNumber3 = ?, ExpMonth3 = ?, ExpYear3 = ? WHERE UserID =?",
#                     (BillingAddr, BillingCity, BillingState, BillingZip, CardNumber1, ExpMonth1, ExpYear1, CardNumber2, ExpMonth2, ExpYear2, CardNumber3, ExpMonth3, ExpYear3, 4))

# print("PaymentInfo Table populated")

"""
Creates Booking table.
"""
executeAndCommit(conn, '''DROP table IF EXISTS Booking''')
executeAndCommit(conn, '''CREATE TABLE Booking (
    ID INTEGER PRIMARY KEY,
    MovieTitle TEXT DEFAULT NULL,
    NumberOfTickets INTEGER,
    ShowDate TEXT DEFAULT NULL,
    ShowTime TEXT DEFAULT NULL,
    TotalPrice REAL DEFAULT NULL,
    CardNumber TEXT DEFAULT NULL,
    Seats TEXT DEFAULT NULL,
    Email TEXT DEFAULT NULL,
    PromotionID TEXT DEFAULT NULL)''')
print("Booking Table created successfully")

executeAndCommit(conn, """INSERT INTO Booking (MovieTitle, NumberOfTickets, ShowDate, ShowTime, TotalPrice , CardNumber, Seats, Email, PromotionID) VALUES
                ('Knock at the Cabin', 3, '2023-04-20', '12:30', 33.20 , 'CardNumber', 'A1,A2,A3', 'user@gmail.com', 'mom'),
                ('80 for Brady', 3, '2023-04-26', '5:30', 33.20 , 'CardNumber', 'A1,A2,A3', 'user@gmail.com', ''),
                ('Knock at the Cabin', 3, '2023-04-20', '3:30', 22.88 , 'CardNumber2', 'B1,B2,B3', 'user1@gmail.com', 'spring')
             """)

"""
Creates Promotion table.
"""
executeAndCommit(conn, '''DROP table IF EXISTS Promotion''')
executeAndCommit(conn, '''CREATE TABLE Promotion (
    ID INTEGER PRIMARY KEY,
    Name TEXT DEFAULT NULL,
    Code TEXT DEFAULT NULL,
    Discount INTEGER DEFAULT NULL,
    StartDate TEXT DEFAULT NULL,
    EndDate TEXT DEFAULT NULL)''')
print("Promotion Table created successfully")

executeAndCommit(conn, """INSERT INTO Promotion (Name, Code, Discount, StartDate, EndDate ) VALUES
    ("Valentine's Day", 'valentines', 15, '1/20/23', '2/15/23'),
    ('Spring', 'spring', 10, '3/21/23', '4/4/23'),
    ("Mother's Day", 'mom', 20, '5/1/23', '5/14/23'),
    ("Father's Day", 'dad', 20, '6/15/23', '6/21/23'),
    ('Independence Day', 'july4th', 20, '6/20/23', '7/4/23'),
    ('Halloween', 'spooky', 20, '10/15/23', '10/31/23'),
    ('Thanksgiving', 'thanksgiving', 20, '11/14/23', '11/28/23'),
    ('Christmas', 'christmas', 10, '12/14/23', '12/25/23'),
    ("New Year's", 'happynewyear', 20, '12/25/23', '1/1/24')
    """)
print("Promotion Table populated successfully.")

"""
Creates Seat table.
"""
executeAndCommit(conn, '''DROP table IF EXISTS Seat''')
executeAndCommit(conn, '''CREATE TABLE Seat (
    ID INTEGER PRIMARY KEY,
    AvailSeats INTEGER DEFAULT NULL,
    SeatNumber INTEGER DEFAULT NULL)''')
print("Seat Table created successfully")

"""
Creates Shows table.
"""
executeAndCommit(conn, '''DROP table IF EXISTS Shows''')
executeAndCommit(conn, '''CREATE TABLE Shows (
    ID INTEGER PRIMARY KEY,
    ShowDate TEXT DEFAULT NULL,
    ShowTime TEXT DEFAULT NULL,
    ShowDuration TEXT DEFAULT NULL,
    Title TEXT DEFAULT NULL,
    RoomNumber TEXT DEFAULT NULL)''')
print("Shows Table created successfully")

# executeAndCommit(conn, """INSERT INTO Shows (ShowDate, ShowTime, ShowDuration, MovieTitle, RoomNumber) VALUES
#     ("2023-04-20", '12:30', "1h 34m", 'Title', '3')
#     """)
# print("Shows Table populated successfully.")

executeAndCommit(conn, """INSERT INTO Shows (ShowDate, ShowTime, ShowDuration, Title, RoomNumber) VALUES
    ("2023-04-20", '12:30', "1h 34m", 'Knock at the Cabin', '3'),
    ("2023-04-20", '17:30', "1h 34m", 'Avatar: The Way of Water', '2'),
    ("2023-04-25", '15:30', "1h 34m", 'Knock at the Cabin', '3'),
    ("2023-12-20", '3:30', "1h 34m", 'M3GAN', '2')
    """)
print("Shows Table populated successfully.")

# """
# Creates Ticket table.
# """
# executeAndCommit(conn, '''DROP table IF EXISTS Ticket''')
# executeAndCommit(conn, '''CREATE TABLE Ticket (
#     ID INTEGER PRIMARY KEY,
#     Price REAL DEFAULT NULL,
#     BookingID INTEGER DEFAULT NULL,
#     ShowID INTEGER DEFAULT NULL,
#     TicketType TEXT DEFAULT NULL)''')
# print("Ticket Table created successfully")


# Final line to commit all changes