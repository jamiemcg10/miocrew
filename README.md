<h1><img src='client/public/goose.svg' width="75" height="75"> MioCrew 
</h1>

<br />

**MioCrew** is a full stack app designed to help people coordinate group trip logistics. Users can create trips, add the crew who's going, create a schedule, track expenses, and more.

_This is a demo app._ There is a pre-set list of users that you can log in as, and then you can interact with the app as one of those users. ChatGPT was used to help create demo data for the app and for each of the users to help give a realistic feel for the app.

The front end was built with **React** and incorporates **Next.js** for routing. Material UI is the main component library used. Select HeroUI components and Tailwind CSS are also used.

The back end was built with **Python** and **FastAPI**. Its main function is to provide an API for database access. I used a **SQLite** database with SQLAlchemy to easily allow demoers to use the app with their own db copy while maintaining the possibility of switching to a more robust database in the future. In addition, **WebSockets** are used to synchronize front end communication when the database is updated.

<br>

---

### Update log:

2/9/26: FastAPI back end with SQLite db is functional. 🎉

7/29/25: Front end is complete. Backend still not implemented.

7/22/25: Front end is almost complete, with only the login and settings pages missing, along with some final cleanup. Backend still not implemented.

7/9/25: Front end is almost complete, with only the login and expenses pages missing. As there is no backend, some of the current data is shared between trips.

<br />

## Running the app locally

To run this app locally,

1.  Create a .env file in the client folder with the following key/value pairs. If the server opened in the next step opens on a port other than 8000, these will need to be updated:

        NEXT_PUBLIC_SERVER_BASE_URL = http://localhost:8000
        NEXT_PUBLIC_WEBSOCKET_BASE_URL = ws://localhost:8000

1.  Navigate to the server folder and start the server by running the following commands:

        venv\Scripts\activate
        uvicorn main:app --reload

    The API can be accessed directly at http://127.0.0.1:8000/docs. If the server is activated on a port other than 8000, use that port instead.

1.  Navigate to the client folder and start the dev server by running

        npm run dev

    You can then access the app at http://localhost:3000. As with the server, if the dev server is activated on a different port, use that instead.
