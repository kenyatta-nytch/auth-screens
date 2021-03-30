const signInControl = 
    `<button type="button" id="modal_open_btn" class="link_btn" onclick="toggleModal(event)">SignIn</button>`;

const sideNavControl =
    `<button type="button" id="sidenav_open_btn" class="link_btn" onclick="toggleSideNav(event)">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>
    </button>`

const auth =
    `<div class="auth_container">
        <header class="header">
            <h1>Logo</h1>
            <div id="auth_nav_controls">${signInControl}</div>
        </header>
        <section>
            <div id="modal_container" class="modal_closed">
                <section class="modal_header">
                    <h3>Logo</h3>
                    <button type="button" id="modal_close_btn" class="link_btn close_btn">&#10060</button>
                </section>
                <section class="modal_body">
                    <div class="content">
                        <section class="signup">
                            <h2 class="form_header">Sign Up</h2>
                            <div class="auth_redirect">
                                <p>Already have an account?</p>
                                <button type="button" id="signin_redirect" class="link_btn redirect_btn">Sign In</button>
                            </div>
                            <form id="signup" class="auth_form" method="POST" onsubmit="signUp(event)">
                                <input required type="text" name="fname" id="signup_fname" class="auth_input" placeholder="First Name"/>
                                <input required type="text" name="lname" id="signup_lname" class="auth_input" placeholder="Last Name"/>
                                <input required type="email" name="email" id="signup_email" class="auth_input" placeholder="Email Address"/>
                                <input required type="password" name="password" id="signup_pass" class="auth_input" placeholder="Password"/>
                                <div id="signup_errors" class="errors"></div>
                                <label class="terms_conditions">
                                    <input required type="checkbox" name="terms" class="auth_input" id="terms_conditions"/>
                                   By checking this box, you accept our Terms & Conditions
                                </label>
                                <button type="submit" id="signup_btn" class="auth_btn">Sign Up</button>
                            </form>
                        </section>
                        <section class="signin">
                            <h2 class="form_header">Sign In</h2>
                            <div class="auth_redirect">
                                <p>No account?</p>
                                <button type="button" id="signup_redirect" class="link_btn redirect_btn">Sign Up</button>
                            </div>
                            <form id="signin" class="auth_form" method="POST" onsubmit="signIn(event)">
                                <input required type="email" name="email" id="signin_email" class="auth_input" placeholder="Email Address"/>
                                <input required type="password" name="password" id="signin_pass" class="auth_input" placeholder="Password"/>
                                <div id="signin_errors" class="errors"></div>
                                <div class="secondary">
                                    <label>
                                        <input type="checkbox" name="remember" class="auth_input" id="remember_me"/>
                                            Remember me
                                    </label>
                                    <button type="button" id="forgot_password" class="link_btn redirect_btn">I forgot my password</button>
                                </div>
                                <button type="submit" id="signin_btn" class="auth_btn">Sign In</button>
                            </form>
                        </section>
                    </div>
                </section>
            </div>
            <aside id="side_nav" class="side_nav side_nav_closed">
                <section class="side_nav_header">
                    <p class="auth_email">placeholder@email.com</p>
                    <button type="button" id="close_side_nav" class="link_btn">&#10060</button>
                </section>
                <section class="side_nav_body">
                    <a href="#" class="side_nav_links">My projects</a>
                    <a href="#" class="side_nav_links">My orders</a>
                    <a href="#" class="side_nav_links">My account</a>
                    <button type="button" id="logout" class="link_btn">Logout</button>
                </section>
            </aside>
        </section>
    </div>`;
