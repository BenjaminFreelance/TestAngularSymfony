<?php

namespace App\Repository;

use Symfony\Component\HttpFoundation\JsonResponse;

class MovieRepository
{
    /**
     * @Route("/api", name="api")
     */
    public function getJsonFile()
    {
        $movies = file_get_contents(__DIR__ . '/movies.json');

        return new JsonResponse(json_decode($movies));
    }

    /**
     * Top 5 des films les plus diffusés
     *
     * @Route("/api/topmovies", name="api")
     */
    public function getTopBroadcast()
    {
        $jsonMovies = file_get_contents(__DIR__ . '/movies.json');
        $movies = json_decode($jsonMovies);


        array_multisort( array_column($movies, "nb_diffusion"), SORT_DESC, $movies );
        $topFive = array_slice($movies, 0, 5);

        return new JsonResponse($topFive);
    }

    /**
     * Top 5 des films avec le meilleur ratio “Nombre de diffusion en 1ère partie / Nombre de diffusion total”
     *
     * @Route("/api/topratio", name="api")
     */
    public function getTopRatio()
    {
        $jsonMovies = file_get_contents(__DIR__ . '/movies.json');
        $movies = json_decode($jsonMovies, true);

        foreach ($movies as $key => $movie) {
            $movies[$key]['ratio'] = $movie['nb_premiere_partie'] / $movie['nb_diffusion'];
        }

        array_multisort( array_column($movies, "ratio"), SORT_DESC, $movies );
        $topRatio = array_slice($movies, 0, 5);

        return new JsonResponse($topRatio);
    }

    /**
     * Top 5 des réalisateurs avec la meilleur moyenne de diffusion (Somme des moyennes de diffusion par an du réalisateur / nombre de film)
     *
     * @Route("/api/topaverage", name="api")
     */
    public function getTopAverageBroadcast()
    {
        $jsonMovies = file_get_contents(__DIR__ . '/movies.json');
        $movies = json_decode($jsonMovies, true);

        $groupMoviesByDirector = $this->groupMoviesByDirector($movies);

        $topAverage = [];
        foreach ($groupMoviesByDirector as $realisateur =>  $movies) {
            $broadcastAveragesByYear = 0;
            $nbFilm = 0;
            foreach ($movies as $movie) {
                $broadcastAveragesByYear = $broadcastAveragesByYear + $movie['moyenne_diffusion_par_an'];
                $nbFilm++;
            }
            $globalBroadcastAverage = $broadcastAveragesByYear / $nbFilm;

            $topAverage[$realisateur]['global_broadcast_average'] = number_format($globalBroadcastAverage, 2);
            $topAverage[$realisateur]['nb_film'] = $nbFilm;
        }

        array_multisort( array_column($topAverage, "global_broadcast_average"), SORT_DESC, $topAverage);
        $topAverage = array_slice($topAverage, 0, 5);

        foreach($topAverage as $key => $item) {
            $arrayCollection[] = array(
                'global_broadcast_average' => $item['global_broadcast_average'],
                'nb_film' => $item['nb_film'],
                'realisateur' => $key
            );
        }

        return new JsonResponse($arrayCollection);
    }

    /**
     * Group movies by director name
     *
     * @param array $movies
     * @return array
     */
    private function groupMoviesByDirector(array $movies): array
    {
        $result = [];
        foreach ($movies as $key => $movie) {
            //$directors = explode('/', str_replace(' ', '', $movie['realisateur']));
            $directors = explode('/', $movie['realisateur']);
            foreach ($directors as $director) {
                $result[trim($director)][] = $movies[$key];
            }
        }

        return $result;
    }
}