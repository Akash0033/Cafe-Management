import React, { useState } from 'react';
import LogoutButton from '../../Components/LogoutButton';

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="bg-gray-50 min-h-screen">
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        {/* Navigation content - unchanged */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <i className="fa fa-utensils text-2xl text-amber-500 mr-2"></i>
              <h1 className="text-2xl font-bold"  style={{color:'white'}}>CanteenKart</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="/Students/Home" className="font-medium hover:text-amber-400 border-b-2 border-amber-500">Home</a>
              <a href="/Students/About" className="font-medium hover:text-amber-400">About</a>
              <a href="/Students/MenuItemPage" className="font-medium hover:text-amber-400">Items</a>
              <a href="/Students/CheckoutPage" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded">Check Out</a>
              <LogoutButton className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded" />
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <i className={`fa fa-${isMenuOpen ? 'times' : 'bars'} text-xl`}></i>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-gray-800 pb-4">
              <div className="flex flex-col space-y-2 px-4">
                <a href="/Students/Home" className="font-medium py-2 border-b border-gray-700">Home</a>
                <a href="/Students/About" className="font-medium py-2 border-b border-gray-700">About</a>
                <a href="/Students/MenuItemPage" className="font-medium py-2 border-b border-gray-700">Items</a>
                <a href="menu.html" className="font-medium py-2 border-b border-gray-700">Menu</a>
                <div className="flex space-x-2 pt-2">
                  <a href="/Students/MenuItemPage" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded flex-1 text-center">View Items</a>
                  <LogoutButton className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded flex-1 text-center" />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item"><a href="/Students/Home">Home</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">About</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Navbar & Hero End */}
      
      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-start">
                  <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.1s" src="/img/about-1.jpg" />
                </div>
                <div className="col-6 text-start">
                  <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s" src="/img/about-2.jpg" style={{marginTop: '25%'}} />
                </div>
                <div className="col-6 text-end">
                  <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s" src="/img/about-3.jpg" />
                </div>
                <div className="col-6 text-end">
                  <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s" src="/img/about-4.jpg" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">About Us</h5>
              <h1 className="mb-4">Welcome to <i className="fa fa-utensils text-primary me-2" />CanteenKart</h1>
              <p className="mb-4">Welcome to CanteenKart, where we serve delicious food with a touch of love. Located in the heart of Brahmavar, we are dedicated to providing a memorable dining experience for all our guests.</p>
              <p className="mb-4">Our team of expert chefs crafts each dish with the finest ingredients, ensuring every bite is a delight. Whether you're here for a quick bite or a family gathering, we promise to make your visit special.</p>
              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1 className="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">5</h1>
                    <div className="ps-4">
                      <p className="mb-0">Years of</p>
                      <h6 className="text-uppercase mb-0">Experience</h6>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                    <h1 className="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">20</h1>
                    <div className="ps-4">
                      <p className="mb-0">Popular</p>
                      <h6 className="text-uppercase mb-0">Chefs</h6>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
      
      {/* Team Start */}
      {/* Commented out team section */}
      {/* Team End */}
      
      {/* Footer Start */}
      <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Company</h4>
              <a className="btn btn-link" href="/Students/Home">Home</a>
              <a className="btn btn-link" href="/Students/About">About</a>
              <a className="btn btn-link" href="/Students/MenuItemPage">Items</a>
              <a className="btn btn-link" href="/Students/CheckoutPage">Checkout</a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Contact</h4>
              <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />Brahmavar, Udupi</p>
              <p className="mb-2"><i className="fa fa-phone-alt me-3" />+91 97 345 67890</p>
              <p className="mb-2"><i className="fa fa-envelope me-3" />info@cafe.com</p>
              <div className="d-flex pt-2">
                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter" /></a>
                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube" /></a>
                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Opening</h4>
              <h5 className="text-light fw-normal">Monday - Saturday</h5>
              <p>09AM - 05PM</p>
              <h5 className="text-light fw-normal">Sunday</h5>
              <p>Holiday</p>
            </div>
            {/* Designers */}
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Designers</h4>
              <li style={{fontStyle: 'italic'}}>Joel Akash Lobo</li>
              <li style={{fontStyle: 'italic'}}>Sumith B. Mendon</li>
              <li style={{fontStyle: 'italic'}}>Chaithanya Achari</li>
            </div>
         
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                © <a className="border-bottom" href="#">CanteenKart-Cafe</a>, All Right Reserved. 
                {/*/*** This template is free as long as you keep the footer author's credit link/attribution link/backlink. If you'd like to use the template without the footer author's credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                Designed By <a className="border-bottom" href="">Team VGI</a><br /><br />
              
              </div>
              <div className="col-md-6 text-center text-md-end">
               
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
    </div>
  );
};

export default About;