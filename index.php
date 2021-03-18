<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://all-canvas-projects.herokuapp.com/">
    <meta property="og:title" content="All canvas projects">
    <meta property="og:description" content="La description de la preview de la page où y'a tous mes canvas ">
    <meta property="og:image" content="https://bibliotheques.csdm.qc.ca/files/2018/11/10_banques_dimages_gratuites_libres_de_droits-300x169.jpg">


    <title>Canvas Project</title>

    <style>
        body{
            background-color: rgb(19, 32, 44);
            color: seashell;
            margin: 0;
            padding-left: 10px;
        }
        h1{
            margin: 0;
            padding: 20px;
        }
        a{
            color: inherit;
        }
        ul{
            padding: 0;
            width: 100%;

            display: flex;
            flex-direction: row-reverse;
            justify-content: space-evenly;
            flex-wrap: wrap;

            list-style: none;
        }
        li{
            padding: 20px;
            margin: 10px;
            background-color:  rgb(5, 53, 97);
        }
    </style>
</head>
<body>
    <h1>My Mini-Games Projects</h1>
    <ul>
        <!-- pas automatique -->
        <li>
            <a href="./PremierTest/index.html">Bouboules</a>
        </li>
        <li>
            <a href="./StarWarsGame/index.html">Etoiles Guerre Game</a>
        </li>
        <li>
            <a href="./PongTest/index.html">(ping) Pong</a>
        </li>
        <li>
            <a href="./SpaceShooter/index.html">Space Chou fleur</a>
        </li>
        <li>
            <a href="./paint/index.html">Paint mais en mieux</a>
        </li>
        <li>
            <a href="./myTileMap/index.html">Tile (en cours)</a>
        </li>
    </ul>
</body>
</html>