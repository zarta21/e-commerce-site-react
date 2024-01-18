# Full Stack E-Commerce Website

This is e-shop website. 

<img src="./front-end/public/images/shop.jpg" />

It includes:
- Backend API with NodeJS, Express & MongoDB
- Routes for products
- React frontend to view, filter and sort products
- Sass to style elements
- React Router to navigate
- Redux and Redux Toolkit for state managment
- Redux AssyncThynk and Axios to fecth data from MongoDB

## Backend Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create `.env` file an add the following

```
PORT = 5500
MONGO_URI = your mongodb uri
```
### Install Dependencies (front&backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend only
npm start

# Run backend only
npm run dev
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
