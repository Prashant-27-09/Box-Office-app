import React, { useState, useEffect } from "react";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/Config";
import { useShows } from "../misc/custom-hooks";

const Starred = () => {
  const [starred] = useShows();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));
      console.log(promises)
      Promise.all(promises).then(apidata=>apidata.map(show=>({show})))
        .then((results) => {
          setShows(results);
          setIsLoading(false);
          console.log(results)
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Data is loading</div>}
      {error && <div>Error Occured : {error}</div>}
      {!isLoading && !shows && <div>No such shows</div>}
      {!isLoading && !error &&  <div><ShowGrid data={shows}/></div>}
      </MainPageLayout>
  );
};

export default Starred;
