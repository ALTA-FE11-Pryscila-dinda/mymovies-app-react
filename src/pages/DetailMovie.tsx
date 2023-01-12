import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

import { LoadingAnimation } from "components/Loading";
import Carousel from "components/Carousel";
import Button from "components/Button";
import Layout from "components/Layout";

import { MovieType, VideosType } from "utils/types/movie";
import { useTitle } from "utils/hooks/customHooks";

const DetailMovie = () => {
  const { id_movie } = useParams();
  // const params = useParams(); // params.id_movie
  const [data, setData] = useState<MovieType>({});
  const [videos, setVideos] = useState<VideosType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useTitle(`${data.title}- NetVio`);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(
      `https://api.themoviedb.org/3/movie/${id_movie}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&append_to_response=videos`,
      { method: "GET" }
    )
      .then((response) => response.json()) // untuk mengkonversi response menjadi json
      .then((data) => {
        // dia akan masuk ke then jikalau dia berstatus OK atau berhasil
        setData(data);
        setVideos(data.videos?.results);
      })
      .catch((error) => {
        // masuk catch ketika server mengirimkan status tidak berhasil
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  return (
    <Layout>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Carousel
            datas={videos.slice(0, 5)}
            content={(data) => (
              <iframe
                width="100%"
                height="95%"
                src={`https://www.youtube.com/embed/${data.key}`}
                title={data.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          />
          <div
            className=" container lg:container md:container   sm:container w-full justify-center flex justify-items-center
           h-auto"
          >
            <div className="  rounded-2xl flex h-full p-12 w-9/12 dark:bg-navy bg-mint">
              <img
                style={{ width: 300 }}
                className="object-contain rounded-2xl"
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
              />

              <div
                className="p-5 text-putih
                 font-bold 
              text-lg items-center"
              >
                <p
                  className="text-center 
                 text-5xl font-bold"
                >
                  {data.title}
                </p>
                <br />
                <p className="text-start">{data.overview}</p>
                <br />
                <p>Release : {moment(data.release_date).format("YYYY")}</p>
                <p>Duration : {data.runtime} minute</p>
                <p>
                  Genre :{" "}
                  {data.genres
                    ?.map((genre) => {
                      return genre.name;
                    })
                    .join(", ")}
                </p>
                <br />
                <Button label=" Watch Now" />
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default DetailMovie;
