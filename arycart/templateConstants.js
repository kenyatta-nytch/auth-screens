export const CART_ICON =
        `<div class="cart-icon">
            <a id="cart-link" href="">
                <span id="cart-count" class="cart-icon-count">0</span>
                <svg
                    height="20pt"
                    width="20pt" 
                    viewBox="0 -31 512.00033 512"
                    xmlns="http://www.w3.org/2000/svg" 
                    id="fi_1170627"
                ><path d="m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0"></path><path d="m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0"></path><path d="m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0"></path>
                </svg>
            </a>
        </div>`;

export const AUTH_CONTROL =
    `<button type="button" id="modal_open_btn" class="link_btn">SignIn</button>`;

export const SIDENAV_CONTROL =
    `<button type="button" id="sidenav_open_btn" class="link_btn">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20pt"
            height="20pt"
            viewBox="0 0 24 24"
        ><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
    </button>`

export const SIGNIN =
    `<section class="signin">
        <h2 class="form_header">Sign In</h2>
        <div class="auth_redirect">
            <p>No account?</p>
            <button type="button" id="signup_redirect" class="link_btn redirect_btn">Sign Up</button>
        </div>
        <form id="signin" class="auth_form" method="POST">
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
    </section>`;

export const SIGNUP =
    `<section id="signup" class="signup">
        <h2 class="form_header">Sign Up</h2>
        <div class="auth_redirect">
            <p>Already have an account?</p>
            <button type="button" id="signin_redirect" class="link_btn redirect_btn">Sign In</button>
        </div>
        <form id="signup" class="auth_form" method="POST">
            <input required type="text" name="firstname" id="signup_fname" class="auth_input" placeholder="First Name"/>
            <input required type="text" name="lastname" id="signup_lname" class="auth_input" placeholder="Last Name"/>
            <input required type="email" name="email" id="signup_email" class="auth_input" placeholder="Email Address"/>
            <input required type="password" name="password" id="signup_pass" class="auth_input" placeholder="Password"/>
            <div id="signup_errors" class="errors"></div>
            <label class="terms_conditions">
                <input required type="checkbox" name="terms" class="auth_input" id="terms_conditions"/>
                By checking this box, you accept our Terms & Conditions
            </label>
            <button type="submit" id="signup_btn" class="auth_btn">Sign Up</button>
        </form>
    </section>`;

export const SIDENAV =
    `<aside id="side_nav" class="side_nav side_nav_closed">
        <section class="side_nav_header">
            <p id="user-email" class="user_email">Please Log In</p>
            <button type="button" id="close_side_nav" class="link_btn">&#10060</button>
        </section>
        <section class="side_nav_body">
            <a href="/myprojects" class="side_nav_links">My projects</a>
            <a href="/myorders" class="side_nav_links">My orders</a>
            <a href="/account" class="side_nav_links">My account</a>
            <a id="logout" href="#" class="side_nav_links">Logout</a>
        </section>
    </aside>`;

export const MODAL =
    `<div id="modal_container" class="modal_closed">
        <section class="modal_header">
            <h3>Logo</h3>
            <button type="button" id="modal_close_btn" class="link_btn close_btn">&#10060</button>
        </section>
        <section class="modal_body">
            <div class="content">
            
            </div>
        </section>
    </div>`
;
