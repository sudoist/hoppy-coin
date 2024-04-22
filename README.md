[![Laravel Forge Site Deployment Status](https://img.shields.io/endpoint?url=https%3A%2F%2Fforge.laravel.com%2Fsite-badges%2Fa78841fc-4b44-4a3f-87cb-585b834140fa%3Fdate%3D1%26commit%3D1&style=plastic)](https://forge.laravel.com/servers/733512/sites/2290021)

<!-- Improved compatibility of back to top link: See: https://github.com/sudoist/hoppy-coin/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[comment]: <> ([![LinkedIn][linkedin-shield]][linkedin-url])



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/sudoist/hoppy-coin">
    <img src="https://res.cloudinary.com/langitlupakintoncloud/image/upload/v1713776460/hoppy.co.in/my9ktuo38zek3yf8uecq.png" alt="Logo">
  </a>

<h3 align="center">HOPPY COIN</h3>

  <p align="center">
    A Phaser 3 game built on the getting started tutorial.
    <br />
    <a href="https://github.com/sudoist/hoppy-coin"><strong>Explore the code »</strong></a>
    <br />
    <br />
    <a href="https://hoppy.co.in">Play</a>
    ·
    <a href="https://github.com/sudoist/hoppy-coin/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/sudoist/hoppy-coin/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://res.cloudinary.com/langitlupakintoncloud/image/upload/v1713776936/hoppy.co.in/i2vugl2zwoj7bz03wfgh.png)

I have always wanted to learn game development, even have RPG Maker collecting dust in Steam.

Finally, started with Phaser 3!

At first, I didn't know what I was doing but eventually got the hang of it.

For this project, I will try to add any mechanic I can think of.

Yes, even cancerous energy systems, abundant currencies, pay-to-win elements, and the infamous double rewards or unlocks after watching ads.

Let's see how far can this go.

So, without further ado, let's code and play!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Phaser][phaser.io]][phaser-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [![tailwindcss.com][tailwindcss.com]][tailwindcss-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Clone or download a copy of this project.

* Clone the git repository via [https](https://github.com/sudoist/hoppy-coin.git), ssh or with the GitHub Windows or Mac clients.
* Download as [zip](https://github.com/sudoist/hoppy-coin/archive/refs/heads/master.zip)

### Prerequisites

At least basic knowledge of HTML, Javascript, CSS and web server for Phaser.

Here are several options:

* [XAMPP](https://www.apachefriends.org/)
* [http-server](https://www.npmjs.com/package/http-server)
* [Docker](https://www.docker.com/)


### Installation



I personally use Docker/laradock for my environment.

Install docker using [Docker Desktop](https://www.docker.com/products/docker-desktop/) for Windows or install using any package manager you might be using for Linux and Mac.

1. Clone or download laradock zip
  ```sh
  git clone https://github.com/Laradock/laradock.git
  ```

2. Go inside the laradock folder then copy env example to .env
  ```sh
  cp .env.example .env
  ```

3. Run your web server
  ```sh
  docker-compose up -d nginx
  ```

4. You can now access the game at [localhost](http://localhost/)

<!-- ROADMAP -->
## Roadmap

- [] Add Changelog
- [] Fix mobile side of stuff (Currently focusing on desktop)
- [] Add more stages
- [] Add more mechanics  (In-app purchases(For educational purposes), Power ups, HP, Ads reward, multiplayer)
- [] Add tutorial
- [] Add a way to play old versions
- [] Create new API instances for testing
- [] Create new repo for the Laravel API
- [] Add a little story to practice making scenes
- [] Events (Seasonal and weekly)

See the [open issues](https://github.com/sudoist/hoppy-coin/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

John Cosio - mail@jcos.io

Project Link: [https://github.com/sudoist/hoppy-coin](https://github.com/sudoist/hoppy-coin)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Thanks and credits for the resources used in this project.

#### References

- [Phaser examples](https://labs.phaser.io/)
- [Enclave-Phaser-Template](https://github.com/EnclaveGames/Enclave-Phaser-Template)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template/tree/master)

#### Music

- [50+ FREE Songs for your projects!](https://tyegamedev.itch.io/50-songs-for-your-projects)
- [Platformer Game Music Pack](https://opengameart.org/content/platformer-game-music-pack)

#### Backgrounds
* [Toptal](https://www.toptal.com/designers/subtlepatterns/restaurant-2/)
* [Unsplash](https://shields.io)
  
    - https://unsplash.com/@jcosio (A little shilling won't hurt)
    - https://unsplash.com/@danasaki
    - https://unsplash.com/@xaprrr
     - https://unsplash.com/@nate_dumlao


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/sudoist/hoppy-coin.svg?style=for-the-badge
[contributors-url]: https://github.com/sudoist/hoppy-coin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sudoist/hoppy-coin.svg?style=for-the-badge
[forks-url]: https://github.com/sudoist/hoppy-coin/network/members
[stars-shield]: https://img.shields.io/github/stars/sudoist/hoppy-coin.svg?style=for-the-badge
[stars-url]: https://github.com/sudoist/hoppy-coin/stargazers
[issues-shield]: https://img.shields.io/github/issues/sudoist/hoppy-coin.svg?style=for-the-badge
[issues-url]: https://github.com/sudoist/hoppy-coin/issues
[license-shield]: https://img.shields.io/github/license/sudoist/hoppy-coin.svg?style=for-the-badge
[license-url]: https://github.com/sudoist/hoppy-coin/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: https://res.cloudinary.com/langitlupakintoncloud/image/upload/v1713776936/hoppy.co.in/i2vugl2zwoj7bz03wfgh.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[phaser.io]: https://img.shields.io/badge/phaser-FFFFFF?style=for-the-badge&logo=phaser&logoColor=white
[phaser-url]: https://phaser.io/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[tailwindcss.com]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=white
[tailwindcss-url]: https://tailwindcss.com/