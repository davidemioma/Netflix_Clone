import Head from "next/head";
import axios from "axios";
import request from "../util/request";
import { MovieProps } from "../types";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Row from "../components/Row";
import MoviePlayer from "../components/MoviePlayer";
import { moviePlayerSelector } from "../store/ui-slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import Plans from "../components/Plans";
import useSubscription from "../hooks/useSubscription";
import { useDispatch, useSelector } from "react-redux";
import { menuSelector } from "../store/ui-slice";
import { setOpenMenu } from "../store/store";
import useList from "../hooks/useList";

interface Props {
  netflixOriginals: MovieProps[];
  trendingNow: MovieProps[];
  topRated: MovieProps[];
  actionMovies: MovieProps[];
  comedyMovies: MovieProps[];
  horrorMovies: MovieProps[];
  romanceMovies: MovieProps[];
  documentaries: MovieProps[];
  products: Product[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}: Props) => {
  const [user, loading] = useAuthState(auth);

  const myList = useList();

  const playerOpen = useSelector(moviePlayerSelector);

  const subscription = useSubscription();

  const dispatch = useDispatch();

  const openMenu = useSelector(menuSelector);

  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;

  return (
    <div
      className={`${
        playerOpen ? "h-screen overflow-hidden" : "h-screen lg:h-[140vh]"
      } relative w-screen bg-gradient-to-b`}
      onClick={() => openMenu && dispatch(setOpenMenu(false))}
    >
      <Head>
        <title>Netflix Clone - Home</title>

        <link rel="icon" href="/netflix-logo.jpeg" />
      </Head>

      <Header />

      <Banner movies={netflixOriginals} />

      <main className="absolute z-30 w-screen mt-[400px] md:mt-[600px] px-6 md:px-8">
        <section id="tvShows">
          <Row title="Netflix Originals" movies={netflixOriginals} />
        </section>

        <section id="new & popular">
          <Row title="Trending Now" movies={trendingNow} />

          <Row title="Top Rated" movies={topRated} />
        </section>

        <section id="movies">
          <Row title="Action Thrillers" movies={actionMovies} />

          <Row title="Comedies" movies={comedyMovies} />

          <Row title="Scary Movies" movies={horrorMovies} />

          <Row title="Romance Movies" movies={romanceMovies} />

          <Row title="Documentaries" movies={documentaries} />
        </section>

        {myList.length > 0 && (
          <section id="myList">
            <Row title="My List" movies={myList} />
          </section>
        )}
      </main>

      {playerOpen && <MoviePlayer />}
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  });

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    axios.get(request.fetchNetflixOriginals),
    axios.get(request.fetchTrending),
    axios.get(request.fetchTopRated),
    axios.get(request.fetchActionMovies),
    axios.get(request.fetchComedyMovies),
    axios.get(request.fetchHorrorMovies),
    axios.get(request.fetchRomanceMovies),
    axios.get(request.fetchDocumentaries),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.data.results,
      trendingNow: trendingNow.data.results,
      topRated: topRated.data.results,
      actionMovies: actionMovies.data.results,
      comedyMovies: comedyMovies.data.results,
      horrorMovies: horrorMovies.data.results,
      romanceMovies: romanceMovies.data.results,
      documentaries: documentaries.data.results,
      products,
    },
  };
};

export default Home;
