<?php
namespace App;
use GuzzleHttp\Client;

class ChitChat {
    static $randomColours = [
        '#2d97c1',
        '#e1f542',
        '#ed3830',
        '#fca638'
    ];

    protected $port;
    protected $hostName;

    public function __construct($hostName, $port)
    {
        $this->setHostName($hostName);
        $this->setPort($port);
    }

    /**
     * @return mixed
     */
    public function getPort()
    {
        return $this->port;
    }

    /**
     * @param mixed $port
     */
    public function setPort($port)
    {
        $this->port = $port;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getHostName()
    {
        return $this->hostName;
    }

    /**
     * @param mixed $hostName
     */
    public function setHostName($hostName)
    {
        $this->hostName = $hostName;

        return $this;
    }

    // Randomly selects a colour from the $randomColours array
    public function getRandomColour()
    {
        return self::$randomColours[rand(0, count(self::$randomColours)-1)];
    }

    // Creates a token to pass to the client
    // Hitting this URL must be done from the serverside
    public function getToken(
        $room,
        $username,
        $colour,
        $imageUrl = ''
    )
    {
        $client = new Client();
        $response = $client->get(
            $this->getHostname() . ':' . $this->getPort() . '/auth/create',
            [
                'query' => [
                    'room' => $room,
                    'username' => $username,
                    'colour' => $colour,
                    'imageurl' => $imageUrl
                ]
            ]
        );
        if ($response->getStatusCode() == '200') {
            $response = json_decode($response->getBody(), true);
            return $response['token'];
        } else {
            return false;
        }
    }
}