import { Component } from "react";
import moment from "moment";

import { SkeletonLoading } from "../components/Loading";
import Layout from "../components/Layout";
import Button from "../components/Button";

type GenreType = {
  id?: number;
  name?: string;
};

interface DataType {
  id?: number;
  title?: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  runtime?: number;
  genres?: GenreType[];
}

interface PropsType {}

interface StateType {
  loading: boolean;
  data: DataType;
}

export default class DetailMovie extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      // state: default value
      data: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      `https://api.themoviedb.org/3/movie/683328?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <Layout>
        {this.state.loading ? (
          <SkeletonLoading />
        ) : (
          <div className="bg-blue-900 w-full h-auto">
            <div className="sm:container sm:flex-row p-16 m-6 flex justify-items-center  ">
              <img
                style={{ width: 300 }}
                className=" object-contain rounded"
                src={`https://image.tmdb.org/t/p/w500${this.state.data.poster_path}`}
                alt={this.state.data.title}
              />

              <div
                className="p-5 text-blue-100 font-bold 
              text-lg items-center"
              >
                <p>Title: {this.state.data.title}</p>
                <p>
                  Release Date:{" "}
                  {moment(this.state.data.release_date).format("DD MMMM YYYY")}
                </p>
                <p>Runtime: {this.state.data.runtime}</p>
                <p>
                  Genre:{" "}
                  {this.state.data.genres
                    ?.map((genre) => {
                      return genre.name;
                    })
                    .join(", ")}
                </p>
                <p className="text-justify">
                  Overview: {this.state.data.overview}
                </p>
                <br />
                <Button label=" Watch Now" />
              </div>
            </div>
          </div>
        )}
      </Layout>
    );
  }
}
