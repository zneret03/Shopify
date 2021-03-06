import React, { useContext, useState, useEffect } from "react";
import { Input } from "antd";
import { Minus, BarChart2 } from "react-feather";
import { withRouter } from "react-router-dom";

//*Components
import {
  filtered,
  onSearch,
  filterTotal,
  paidItems,
} from "../../utils/FilteredItems";
import TopSalesTable from "./TopSalesTable";
import { AuthContext } from "../../auth/AuthProvider";
import { TopSalesContext } from "../../Context/TopSalesProvider";
import Analytics from "./BarChart";
import ExportExcel from "./ExportExcel";

const today = new Date().toISOString().substr(0, 10);

interface dateType {
  start: string;
  end: string;
}

const dateObj: dateType = {
  start: today,
  end: today,
};

const TopSales: React.FC = () => {
  const currentUser = useContext(AuthContext);
  const { dispatch, soldProduct } = useContext(TopSalesContext);

  const [searchFilter, setSearchFilter] = useState(null);

  //**return current user product posted */
  const filteredProduct = filtered(soldProduct, currentUser);
  //** Return paid items only */
  const paidOrders = paidItems(filteredProduct);

  //*returning total purchase
  const totalPurchase = filterTotal(paidOrders);

  const [{ start, end }, setState] = useState(dateObj);

  const [toggleAnalytics, setToggleAnalytics] = useState(false);

  //*Return true or false when clicking analytic
  const onClickAnalytics = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    paidOrders.length > 0 && setToggleAnalytics(true);
  };

  useEffect(() => {
    function reducerDispatch() {
      dispatch({ type: "topSales", payload: { start, end } });
    }

    reducerDispatch();
    return () => setToggleAnalytics(false);
  }, [start, end, dispatch]);

  //*Date change event
  const dateOnChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <div className="mb-3 sm:flex sm:items-center sm:justify-between">
        <div className="sm:mb-0 mb-2 sm:flex sm:items-center sm:justify-between">
          <span className="mr-4 md:block hidden">Filter By : </span>
          <input
            type="date"
            name="start"
            value={start}
            className="px-2 py-1 sm:w-32 w-full sm:mb-0 mb-1 border rounded-sm text-sm cursor-pointer text-center"
            onChange={(event) => dateOnChanged(event)}
          />
          <Minus size="15" className="mx-1 sm:block hidden" />
          <input
            type="date"
            name="end"
            value={end}
            className="px-2 py-1 sm:w-32 w-full sm:mb-0 mb-1 border mr-4 rounded-sm text-sm cursor-pointer text-center"
            onChange={(event) => dateOnChanged(event)}
          />
          <button
            onClick={(event) => onClickAnalytics(event)}
            type="button"
            className="px-6 py-1 sm:w-32 md:mr-0 mr-2 w-full bg-orange-400 hover:bg-orange-300 rounded-sm text-white flex items-center"
          >
            <span className="mr-2">Analytics</span>
            <BarChart2 size="18" />
          </button>
          <div className="ml-2">
            <ExportExcel csvData={paidOrders} fileName="topSales" />
          </div>
        </div>
        <div className="flex items-center">
          <Input.Search
            allowClear
            className="sm:max-w-xs w-full"
            placeholder="Search by..."
            onSearch={(nameSearch) => {
              const itemsSearch = onSearch(nameSearch, paidOrders);
              setSearchFilter(itemsSearch);
            }}
          />
        </div>
      </div>
      <TopSalesTable searchFilter={searchFilter} paidOrders={paidOrders} />

      {toggleAnalytics ? (
        <Analytics
          totalPurchase={totalPurchase}
          topSalesData={paidOrders}
          width="40vw"
          height="80vw"
          axes={true}
          legend={false}
          chartType="bar"
        />
      ) : (
        <div className="text-center mt-5">
          <h1 className="text-sm text-gray-400">
            Click the button to show analytics
          </h1>
        </div>
      )}
    </div>
  );
};

export default withRouter(TopSales);
