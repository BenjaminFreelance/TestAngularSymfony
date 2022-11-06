<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\MovieRepository;

class ApiController extends AbstractController
{
    /**
     * @var MovieRepository
     */
    private $movieRepository;

    /**
     * @param MovieRepository $movieRepository
     */
    public function __construct(MovieRepository $movieRepository)
    {
        $this->movieRepository = $movieRepository;
    }
    /**
     * @Route("/api", name="api")
     */
    public function index(): Response
    {
        return $this->movieRepository->getJsonFile();
    }

    /**
     * @Route("/api/topbroadcast", name="topBroadcast")
     */
    public function topBroadcast(): Response
    {
        return $this->movieRepository->getTopBroadcast();
    }

    /**
     * @Route("/api/topratio", name="topRatio")
     */
    public function topRatio(): Response
    {
        return $this->movieRepository->getTopRatio();
    }

    /**
     * @Route("/api/topaverage", name="topAverage")
     */
    public function topAverageBroadcast(): Response
    {
        return $this->movieRepository->getTopAverageBroadcast();
    }
}
