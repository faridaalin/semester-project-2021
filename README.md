# Holidaze - Hotel booking website 2021

Final semester project at after two yeard of vocational programe in fronend development [School of Technology and Digital Media](https://www.noroff.no/).

- [Styleguide](https://www.figma.com/file/SJnvvdbi4aZchirM3lplSq/Holizade-Style-Guide?node-id=0%3A1)
- [Wireframe](https://www.figma.com/proto/1gNhUFEKlyZ2QFU8dNOyZ7/Holidaze-wireframe?page-id=0%3A1&node-id=1%3A2&scaling=min-zoom)
- [Prototype Desktop](https://www.figma.com/proto/L4K2qS4bgQHup4cwcQHhdE/Holizade-Desktop?page-id=0%3A1&node-id=15%3A23&scaling=min-zoom)
- [Prototype Mobile](https://www.figma.com/proto/dWjj4VtpPBxclpUltImmdv/Holidaze-mobile?page-id=0%3A1&node-id=2%3A23&scaling=min-zoom)
- [Notion Planning](https://www.notion.so/69d229f2bad44145a856521ea7944f11?v=133f35b431dc4051bc3d4cca83c5e862)

## Cloning project

If you want this project locally you can either clone or fork this repo.

```
$ git clone https://github.com/faridaalin/semester-project-2021.git
$ cd semester-project-2021
```

## Dev Setup Server

There are few steps for server setup and requirements you need to do. You will need to create MongoDB account. If you do not have a account or do not want to create an account, you can skip this part and proceed to <em>Dev Setup Client</em>.

```
$ cd server
```

```
$ yarn
```

1. Create a free account at [Create an MongoDB Atlas Account](https://docs.atlas.mongodb.com/tutorial/create-atlas-account/), you can follow the steps described here.
2. Create a project, and a Free Tier Cluster.
3. Change env-example to env
4. Then add you env variables.

```
DB=
DB_USER=
DB_PASS=
JWT_SECRET=
NODE_ENV=
PORT=

```

## Dev Setup Client

In the root of your project:

```
$ cd client
```

```
$ yarn
```

```
$ node data/importData.js --import
```

1. You will need a mapbox token. Create a free account at [Mapbox](https://www.mapbox.com/)
2. Rename env.example to env.local
3. Then add you own varibles

```
NEXT_PUBLIC_LOCAL_API= http://localhost:8080
NEXT_PUBLIC_MAPBOX_TOKEN= your mapbox token...
```

## Serving without MongoDB

If you did not set up mondoDB you can use this live api as your local API.

```
$ cd client
```

1. Change NEXT_PUBLIC_LOCAL_API to the following: https://sm-2021-backend.herokuapp.com/api

```
NEXT_PUBLIC_LOCAL_API= https://sm-2021-backend.herokuapp.com/api
NEXT_PUBLIC_MAPBOX_TOKEN= your mapbox token...
```

```
$ yarn run dev
```

Navigate to [localhost:3000](http://localhost:3000)

## Serving the project

You need to run both client and server in order to serve the project. In the root of the project:

```
$ cd client
$ yarn run dev
```

```
$ cd server
$ yarn run dev
```

Then navigate to Navigate to [localhost:3000](http://localhost:3000)

# Project Features

## Visitor Pages and functionalites

- Homepage
- Search bar typeahead (auto dropdown with hotel names that match what has been typed)
- See a results page with all hotels
- View a specific hotel page which displays all details about the hotel
- An enquiry page either modal or separate page
- A contact page (different to enquiry page) which goes to the admin for Holidaze

## Admin Pages and functionalites

- Login as admin user
- View admin dashboard
- Create, Read, Update, Delete a establishment
- View messages sent from visitors
- View enquires/bookings from vistors

# Technologies

## Front-End

Next.js, CSS Modules

- Deployed with Vercel

## Back-End

MongoDB, Express

- Deployed with Heroku
