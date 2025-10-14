import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { getRandomUser } from "../services/apiServices";
import UserCard from "../components/userCard/UserCard";
import Loader from "../../shopping-cart-ts/components/loadingComponent/loader";

const RandomUsers = () => {
  const { isPending, data } = useQuery({
    queryKey: ["randomUser"],
    queryFn: useCallback(async () => {
      const res = await getRandomUser();
      //console.log(res?.data?.results[0], "res");
      return res?.data?.results[0];
    }, []),
  });
  return (
    <div className="fade-in">
      {isPending && <Loader />}
      <UserCard user={data} />
    </div>
  );
};

export default RandomUsers;
