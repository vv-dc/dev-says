### Application Interface
1. Go to the main page (/).
2. Check the user has a token.
3. If a user has a token, validate it on the server.
4. If the user has a token and the token is valid, load the application interface, else load the main landing page.

### Registration
1. Go to the registration page (/register).
2. Input needed data (username, email, password, real name, workplace .etc) to the form or use a popular service (Google, GitHub).
3. Check input on the client (check fields are not empty, validate email and password for consistency) and server (check email and name are unique).
4. If an input has passed validation, then save it to the database, give the user a token, and redirect the user to the main page, else send a message that the input is invalid.

### Login
1. Go to the login page (/login).
2. Input needed data (username or email, password) to the form or log in via popular service (Google, GitHub)
3. Check on the client that all fields are not empty.
4. Check credentials on the server.
5. If credentials are valid, give the user a token and redirect to the main page (with a token will be loaded application interface, else — main landing page), else send a message that credentials are invalid.

### Feed
1. While data is not present, show load placeholder.
2. Get from database posts that are related to users and tags, followed by the current user and were posted less than a week ago, order posts by viewed or not (unviewed posts are first), make union with posts offered by the recommendation system. Paginate received data.
3. Load one page of posts and show them to the user.
4. If the user viewed more than half of one page of posts, load the next page.
5. If there are no posts, show an appropriate message.

### Search
1. Enter a search query to the input.
2. Hit the “Search” button or press “Enter”.
3. While data is not present, show load placeholder.
4. Search in a database for posts tagged with a search query (if query stars with “#”) or posts and users related to the search query, paginate results.
5. Render firsts page of the result of a search.
6. If the user viewed more than half of one page of the result, load the next page.
7. If there is no output, show an appropriate message.

### User Profile
1. Go to user page (/<username>)
2. While data is not present, show load placeholder.
3. Get from the database public information about the user.
4. Display public information about the user.
5. While posts are not present, show load placeholder.
6. Get from database posts made or shared by the current user, paginate it.
7. Display the first page of posts.
8. If the user viewed more than half of the first page of posts, load the next page.
9. If there are no posts, show an appropriate message.

### Settings
1. Go to settings pages (/settings).
2. Change or fill fields in the form.
3. Validate input on the client (check some fields by regex in time).
4. Hit the “Save” button.
5. Validate input on the server (check for consistency, unique constraints).
6. If an input is valid, save it to the database, else — send an appropriate message.

### Follow Relationship
1. Click the “Follow” button near the tag or some user.
2. Check on the server relationship is correct. (it’s invalid to follow oneself or some user twice).
3. Save relationship to the database (many-to-many relationships between user-user or user-tag entities).
4. Show success or error message.

### Database API
1. Build query with query builder.
2. Pass string representation of query and arguments to the Postgres API and execute the call.
3. Get results or an error message.
4. Catch error or process received data.
5. If needed, respond to the client (if a call was executed from the client-side).

### Recommendation System
1. Collect data about the activity of users (comments, likes, reposts) once in a while.
2. Prepare data for loading.
3. Load received data to the data warehouse (separated database service with a structure suitable for storing such data).
4. Process data and make some decisions about the preferences of every particular user that was active no more than a week ago.
5. Find posts that fit analyzed preferences.
6. Make a relationship between those posts and users.
7. If there is no activity from the user, choose the most popular posts for last month.

### Statistics Tracking System
1. Collection data about the activity of users (comments, likes, posts) once in a while.
2. Prepare data for loading.
3. Load received data to the data warehouse (separated database service with a structure suitable for storing such data).
4. Process received and build some statistics depending on it.
5. Store statistics.
6. Be ready to display statistics and build some dynamic plots as fast as possible.

### Bookmark System
1. Tap the “Save” button near the post.
2. Save relationship to the database (many-to-many relationship between post-user entities).
3. It’s also possible to delete a bookmark or list of bookmarks.
4. When bookmark delete is performed, then delete the relationship from the database and its representation on the client-side, show an appropriate message.
5. When a user wants to see a list of bookmarks, just load it from the database performing two JOIN’s between users and posts entities via the users_posts table and display it.

### Post (create, edit)
1. Tap on the “New post” (create a post) or “Edit” (edit existing post) button.
2. Write MarkDown text, insert images and files, inject code snippets directly into the post, so build post structure step by step using the PostUI component.
3. Check on the client post doesn’t include any prohibited symbols in time, check files for size limit, build post preview that will be available at any time during writing the post after tap to “Preview” button.
4. Tap the “Post” (to create a new post) or “Save” (save changes) button.
5. Send post content and current user identifying information (token) to the server.
6. Perform post content validation on the server. If something is wrong, send an appropriate message, else go to the next step.
7. Parse post content on the server, separate files to save, code snippets, tags.
8. Save files from post to the file system, insert to MarkDown links to these files (path in the filesystem).
9. Divide post content into the cells. Every cell can have one of two types (MarkDown, code). Depending on that, build a JSON representation of the post.
10. Set needed additional information to code cells (language, version, compiler, interpreter, etc.).
11. Load created JSON to the database into posts table (or update existing post), save record primary key.
12. Load parsed tags and other additional information to corresponding database tables.
13. Create many-to-many relationships between post author and post via corresponding ID values (only if a post was created).
14. Create needed relationships between the current post and other records created from data parsed from the current post content (tags, etc.).

### Post (delete)
1. Tap the “Delete” button near the post.
2. Send to the backend information that uniquely identifies the post (Id).
3. Delete from the database current post record, and perform cascade delete from all tables, depending on that post.
4. Send success message if deletion performing was executed, else error message.
5. If the deletion was performed, delete the post display on the client-side.

### Post (share)
1. Tap the “Share” button near the post.
2. Send to the server information that uniquely identifies current post (id) and user (token).
3. Check on the server post sharing is valid (it’s invalid to share your post, or share a post twice).
4. If action is valid, build a relationship between the user and shared post (many-to-many between user-post entities), show a success message, else show an error message.

### Post (react)
1. Tap the “Like” or “Dislike” button near the post.
2. Send information that uniquely identifies a post (id), a user (token), and user reaction (1 or -1).
3. Check if already current users reacted to that post.
4. If a reaction already exists, then check if the previous reaction is equal to the new one. If reactions are equal, then nullify the user’s vote, else replace old with new.
5. If it’s the first user reaction (or reaction after nullifying), create a many-to-many relationship between user and reaction, save to it the database.
6. Depending on the server response, display reaction representation, update post grade counter.

### Comment (create)
1. Tap the “Comment” button near the post or tap the “Response” button near the other comment under the post.
2. Enter comment content (everything is the same as when creating a post).
3. Tap on cells in the post (comment) to make a request for changing some lines here, replace or add needed MarkDown text or code.
4. Tap the “Comment” button.
5. Send to the server information about the current user (token), post (id), previous comment (if exists, then id).
6. Perform comment content validation on the server. If something is wrong, send an appropriate message, else go to the next step.
7. Parse comment content on the server, separate files to save, code snippets.
8. Save files from post to the file system, insert to MarkDown links to these files (path in the filesystem).
9. Divide comment content into the cells. Every cell can have one of two types (MarkDown, code). Depending on that, build a JSON representation of the post.
10. Set needed additional information to code cells (language, version, compiler, interpreter, etc.).
11. Load created JSON to the database into comments table (or update existing post), save record primary key.
12. Create many-to-many relationships between post, previous comment (if exists) current comment.
13. Create a relationship between root post (previous comment), current comment, and changes proposed by this comment.

### Comment (update, delete, react)
1. The same as post ones.
