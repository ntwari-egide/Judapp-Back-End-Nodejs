<template>
      <body data-spy="scroll" data-target=".site-navbar-target" data-offset="300"> 

  <div id="overlayer"></div>
  <div class="loader">
    <div class="spinner-border text-success" role="status" id="loadingObject">
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div class="site-wrap"  id="home-section">

    <div class="site-mobile-menu site-navbar-target">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close mt-3">
          <span class="icon-close2 js-menu-toggle"></span>
        </div>
      </div>
    </div>
    <div class="site-blocks-cover" style="overflow: hidden;">
      <div class="container">
        <div class="row align-items-center justify-content-center">

          <div class="col-md-12" style="position: relative;" data-aos="fade-up" data-aos-delay="200">

            <div class="row mb-4" data-aos="fade-up" data-aos-delay="200">
              <div class="col-lg-6 mr-auto">
                <img src="assets/images/Logo.png" alt="Image" data-aos="fade-left">
                <h1>JudApp</h1>
                <p data-aos="fade-up">We are there to support rwandan Law firm to meet with their customers at good place at right time</p>
                <div>
                  <router-link id="loginButton" class="btn btn-primary mr-2 mb-2" :to="{name: 'loginClient'}"> LOGIN NOW</router-link>
                  <a href="#" class="btn btn-primary mr-2 mb-2" id="continueButton">CONTINUE</a>
                </div>
              </div>   
            </div>

          </div>
        </div>
      </div>
    </div>  
  </div>
        <header class="site-navbar js-sticky-header site-navbar-target" role="banner">
          <img src="assets/images/logo of judapp 1.png">
          <div class="main-menu">
            <nav class="site-navigation position-relative text-right" role="navigation">

              <ul class="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block" id="menu">
                <li><a href="#home-section" class="nav-link">HOME</a></li>
                <li><a href="#service-section" class="nav-link">SERVICES</a></li>
                <li><a href="#about-section" class="nav-link">OUR WORK</a></li>
                <li><a href="#blog-section" class="nav-link">Blog</a></li>
                <li><a href="#contact-section" class="nav-link">LOGIN</a></li>
                <li><a href="#footer" class="btn btn-primary mr-2 mb-2" id="getInTouch">Get In Touch</a></li>
              </ul>
            </nav>
          </div>
      </header>
<!--       services container -->

    <div class="site-section" id="service-section">
         <div class="float-left" id="serviceDescriber">
            <h2>Our Services</h2>
            <p>Discover our services in the applications we provide to give better judgement to rwandans , law firms and their clients in general</p>
            <a>GO LOGIN </a>
         </div>
         <div class="float-let row align-items-center" id="serviceLists">
            <div data-aos="fade-up">
                 <img src="assets/images/specialized work.png">
                 <h3>LEGAL SERVICECS</h3>
            </div>
            <div  class="bg-light" data-aos="fade-up">
                 <img src="assets/images/activities on low rate.png">
                 <h3>HIGHT RATED SERVICES</h3>
            </div>
            <div  class="bg-light" data-aos="fade-up">
                 <img src="assets/images/good tech.png">
                 <h3>GETTING IN TOUCH</h3>
            </div>
            <div data-aos="fade-up">
                 <img src="assets/images/administrative-tasks.gif">
                 <h3>LAW FIRM MANAGEMENT</h3>
            </div>
         </div>
    </div>

<!--    about us content -->

    <div class="site-section aboutusContainer" id="about-section">
      <h2 data-aos="fade-down">More ... To Know ?</h2>
      <p data-aos="fade-up">More than just  JudApp , when client signups it automatically provide the nearby law firm of attorney cabinet , we provide room for understanding the laws ,
       chatting room with law firm cabinet members , accessing all available services and also for law firm cabinet the admistrative are made easy than it must </p>
    </div>

<!--     client testimonials -->

    <div id="blog-section">
      <h2>Client testimonials</h2>
      <div class="firstBlog" data-aos="fade-up">
          <img src="assets/images/test 1.png">
          <p class="content">"Last month ago , i had the problems with families to make assets sharing , i needed the attorney to help to know much about laws,
           i signup to this platform i got my workspace to help me in contact to nearer law firm  " </p>
          <p class="blogName">Akeza Faith Meneth</p>
          <p class="blogClientType">CLIENT - JUDAPP</p>
      </div>

      <div class="secondBlog" data-aos="fade-up">
          <img src="assets/images/test 3.png">
          <p class="content">"We were going to work with share holder in our business of milk production , the things were not easy but we didn't have advisor in laws ,
           we used JudApp to meet to nearby law firm to help us in assigning , so now life is easy until the end   " </p>
          <p class="blogName">John Kabera</p>
          <p class="blogClientType">CLIENT - JUDAPP</p>
      </div>

      <div class="thirdBlog" data-aos="fade-up">
          <img src="assets/images/test 2.png">
          <p class="content">"In our law firm ' HUMAN RIGH GUIDERS ' we had problem of providing services at low rate , since we used JudApp we studied to get clients after minute , 
          Judapp makes job easy like administrative functions of law firm , gettin touch with all in general  " </p>
          <p class="blogName">Kamariza Joy Jonath</p>
          <p class="blogClientType">ATTORNEY FROM <strong>HRG</strong> - JUDAPP</p>
      </div>
    </div>

<!--     this is footer -->
 
    <div id="footer">
      <div class="container row align-items-center"  data-aos="fade-up">
          <div>
                <img src="assets/images/Logo.png">
                <li><a href="#about-section" class="nav-link">More about us JudApp</a></li>
                <li><a href="#service-section" class="nav-link">Our Work</a></li>
                <li><a href="#about-section" class="nav-link">All law firms we work with</a></li>
                <li><a href="#blog-section" class="nav-link">Our services</a></li>
          </div>
          <div class="getInTouch">
                <h3>Is there any problem , Call us for support</h3>
                <form>
                    <input type="email" placeholder="Enter your email address"><br><br>
                    <textarea placeholder="some thing to say"></textarea><br><br>
                    <button>GIVE IT TO ME</button>
                </form>
          </div>
          <div class="gologin-section">
                <a href="/loginClient" class="link">I can't wait let me login &rarr; </a>
          </div>
      </div>
      <div class="copyright-section">
        <hr>
         <p id="copyright">Copyright &copy;All rights reserved | This web app is made with <i class="icon-heart text-danger" aria-hidden="true"></i>
          by Ntwari Egide</p>
      </div>
    </div>
</body>
</template>