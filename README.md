# DevSays
## What is DevSays
DevSays is a simple open-source social network for developers. It provides a simple, but powerful interface for efficient code sharing and refactoring. If you have searched for a place to share code or minds, make requests for code changing, and just hanging out, it's for you.
## Features
* Authentication. The application can be accessed via email or using popular services (Google, GitHub). If needed, the password can be reset after credentials confirmation.
* Profile. It holds general information about user, activity statistic, posts, which were made by a user or shared, and comments for those.
* Code. Snippets with code can be injected directly into posts or comments and executed right here.
* Suggestions. With comments tree structure it becomes easy to make suggestions for code changing.
* Reactions. Every post and comment can be liked or disliked.
* Subscriptions. Follow users or tags to get notifications about its activity.
* Bookmarks. Save posts without placing them on your profile.
* Settings. Change public information, customize profile appearance.
* Feed. Get posts depending on your subscriptions and preferences.
* Search. Find users, posts, or tags using a handy search bar.
## Main functionality
### Post
* Has a `cell structure` similar to [Google Colab](https://colab.research.google.com/notebooks/intro.ipynb#) with 2 cell types:
    * MarkDown
    * Code. With this section user can:
      * choose `language` and `compiler, interpreter version`
      * directly execute code with the `Run Code` option (the author can explicitly connect cells to execute all of them sequentially at once)
      * use all `syntax highlighting` functionality
* Supports additional tags like `node`, `backend`
* Can be public or private (accessible only via link)
* Provides special API for code sharing via GitHub
* Is stored in JSON format. Example:
```json
{
    "cells": [
        {
            "type": "markdown",
            "source": "Everything about Python"
        },
        {
            "type": "code",
            "language": "python",
            "version": "3.9.2",
            "source": [
                "comment = 'I am so slow!'",
                "print(comment)"
            ],
            "output": [
                {
                    "data": {
                        "text/html": [
                            "I am so slow!"
                        ]
                    }
                }
            ]
        }
    ]
}
```
### Comment
* Form a tree structure. Users can create topic threads by simply replying to someone's else comment
* Are powerful because of the `text`, `code` suggestion feature. Everyone, who leaves a comment can easily execute code with suggested changes. The author, in turn, can apply all of them in one click.
* Inherit post, however, they are restricted with image, video usage, and content length
## Technologies
* Backend - Node.js
* Frontend - React.js
* Database - PostgreSQL
* CI/CD - Docker, GitHub actions
* Auth - JWT, OAuth 2.0
* Other - Nginx, docker-compose
