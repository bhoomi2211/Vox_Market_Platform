const { useRouter } = require("next/navigation");
const { createContext, useState, useContext } = require("react");

const SellerContext = createContext();

export const SellerProvider = ({children}) => {
  const router = useRouter();

  const [currentSeller, setCurrentSeller] = useState(
    JSON.parse(sessionStorage.getItem("seller"))
   );

  const [sellerLoggedIn, setSellerLoggedIn] = useState(currentSeller !== null);

  const logout = () => {
    setCurrentSeller(null);
    sessionStorage.removeItem("seller");
    setSellerLoggedIn(false);
    router.push("/sellerlogin");
  };

  return (
    <SellerContext.Provider
      value={{
        currentSeller,
        setCurrentSeller,
        sellerLoggedIn,
        setSellerLoggedIn,
        logout,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};


const useSellerContext = () => useContext(SellerContext);
export default useSellerContext;