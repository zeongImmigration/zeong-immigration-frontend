import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { useSelector, useDispatch } from 'react-redux';
import { StudentSearch, ProductGallery, Notification } from 'enl-components';
import {
  fetchAction,
  addAction,
  removeAction,
  checkoutAction,
  detailAction,
  searchAction,
  closeNotifAction
} from '../Ecommerce/reducers/ecommerceActions';
import data from '../Ecommerce/api/productData';

function StudentUniversity() {
  // Redux State
  const keyword = useSelector(state => state.ecommerce.keywordValue);
  const dataProduct = useSelector(state => state.ecommerce.productList);
  const dataCart = useSelector(state => state.ecommerce.cart);
  const productIndex = useSelector(state => state.ecommerce.productIndex);
  const totalItems = useSelector(state => state.ecommerce.totalItems);
  const totalPrice = useSelector(state => state.ecommerce.totalPrice);
  const messageNotif = useSelector(state => state.ecommerce.notifMsg);

  // Dispatcher
  const fetchData = useDispatch();
  const search = useDispatch();
  const handleAddToCart = useDispatch();
  const removeItem = useDispatch();
  const showDetail = useDispatch();
  const checkout = useDispatch();
  const closeNotif = useDispatch();

  const [listView, setListView] = useState('grid');

  useEffect(() => {
    fetchData(fetchAction(data));
  }, []);

  const handleSwitchView = (event, value) => {
    setListView(value);
  };

  const title = brand.name + ' - Ecommerce';
  const description = brand.desc;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification close={() => closeNotif(closeNotifAction)} message={messageNotif} />
      <StudentSearch
        dataCart={dataCart}
        dataProduct={dataProduct}
        removeItem={(payload) => removeItem(removeAction(payload))}
        checkout={() => checkout(checkoutAction)}
        totalItems={totalItems}
        totalPrice={totalPrice}
        search={(payload) => search(searchAction(payload))}
        keyword={keyword}
        listView={listView}
        handleSwitchView={handleSwitchView}
      />
      <ProductGallery
        listView={listView}
        dataProduct={dataProduct}
        showDetail={(payload) => showDetail(detailAction(payload))}
        handleAddToCart={(payload) => handleAddToCart(addAction(payload))}
        productIndex={productIndex}
        keyword={keyword}
      />
    </div>
  );
}

export default StudentUniversity;
