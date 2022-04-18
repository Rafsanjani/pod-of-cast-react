import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Podcast } from "../../model/Podcast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPodcast } from "../recent-episodes/recent-episodes-slice";
import "./PodcastDetail.scss";
import playButton from "../../images/icon-play.svg";

export function PodcastDetail() {
  const podcastEpisodeNumber = Number(useLocation().pathname.split("/").pop());
  const [podcast, setSelectedPodcast] = useState<Podcast>();

  const podcasts: Podcast[] = useAppSelector((state) => state.podcast.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (podcasts.length === 0) {
      dispatch(setPodcast());
    } else {
      const value = podcasts.find((p) => p.episode === podcastEpisodeNumber);
      setSelectedPodcast(value);
    }
  }, [podcasts]);

  return <PodcastDetailContent podcast={podcast} />;
}

type PodcastDetailProp = {
  podcast: Podcast | undefined;
};

interface Person {
  name: string;
}

function PodcastDetailContent({ podcast }: PodcastDetailProp) {
  return (
    <section className="podcast-detail">
      <div className="top">
        <div className="left">
          <img src={podcast?.cover} alt="" />
        </div>
        <div className="right">
          <h3>Episode {podcast?.episode}</h3>
          <h2>{podcast?.title}</h2>
          <hr />
          <p>{podcast?.content}</p>

          <div className="host">
            <div className="hosted-by">
              <img src={podcast?.host.avatar} alt="Cover" />
              <p>Hosted by: </p>
              <p className="host-name">{podcast?.host.name}</p>
            </div>
            <p>
              {podcast?.date.toLocaleDateString("en-us", {
                year: "numeric",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
          <div className="bottom-buttons">
            <button className="button filled-button">Subscribe</button>
            <button className="button outline-button  listen-now-btn">
              <img src={playButton} alt="" />
              <p>
                Listen Now <span>(46 min)</span>
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
