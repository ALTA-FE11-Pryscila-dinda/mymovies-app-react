import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

import { LoadingAnimation } from "../components/Loading";
import Carousel from "../components/Carousel";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { MovieType, VideosType } from "../utils/types/movie";
import { useTitle } from "../utils/hooks/customHooks";

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
                height="315"
                src={`https://www.youtube.com/embed/${data.key}`}
                title={data.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          />
          <div className="bg-blue-900 w-full h-auto">
            <div className="sm:container sm:flex-row p-16 m-6 flex justify-items-center  ">
              <img
                style={{ width: 300 }}
                className=" object-contain rounded"
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
              />

              <div
                className="p-5 text-blue-100 font-bold 
              text-lg items-center"
              >
                <p>Title: {data.title}</p>
                <p>
                  Release Date:{" "}
                  {moment(data.release_date).format("DD MMMM YYYY")}
                </p>
                <p>Runtime: {data.runtime}</p>
                <p>
                  Genre:{" "}
                  {data.genres
                    ?.map((genre) => {
                      return genre.name;
                    })
                    .join(", ")}
                </p>
                <p className="text-justify">Overview: {data.overview}</p>
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
