import * as React from "react";
import { Routes, Route, Outlet, Link, useParams, generatePath, useRouteMatch } from "react-router-dom";

import styled from 'styled-components';

const products = [{
  id: 1,
  name: "Nuts"
},
{
  id: 2,
  name: "Bolts"
},
{
  id: 3,
  name: "Wrenches"
}];

const Header = styled.div`
    background: darkred;
    padding: 10px 20px;
    color: white;
    font-family: sans-serif;
`;

const Product = styled.div`
    padding: 10px 20px;
    background: lightcoral;
    color: white;
    font-family: sans-serif;
    margin: 10px 0px;
    &:nth-child(2n+1) {
      background: white;
      color: black;
    }
`

export default function App() {
  return (
    <div>
      <Header>
        <h1>Inventory management system</h1>
      </Header>
      
      <p>
        Welcome to the inventory app prototype
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path='/products/:id' element={<ProductDetail />}/>
          <Route path="products" element={<Products />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/Products">Products</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Products() {
  const data = products.map(({ id, name }) => (
        <Product className="campaign-list-item" key={id}>
          <Link to={`/Products/${id}`}>{name}</Link>
        </Product>
      ))
  return (
    <div>
      <h2>Products</h2>
      {data}
    </div>
  );
}

function ProductDetail() {
  let { id } = useParams();
  let product = products.find( p=> p.id == id);
  return (
    <div>
      <h2>{id} {product.name}</h2>
      <div>
        <Link to={`/Products`}>Back to list</Link>
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}