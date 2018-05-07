
<a class="overlay-closer form-overlay-closer" href="#" data-action="body-action" data-action-target="bezichtigings-form-active"><i class="far fa-window-close fa-2x"></i></a>

<div class="contact-form-section">

	<div class="contact-form-logo d-none d-lg-block">
		<a class="navbar-brand" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>">
			<img class="img-fluid" src="/img/logo.svg">
		</a>
	</div>

	<?php

	  //response generation function

	  $response = "";

	  //function to generate response
	  function my_contact_form_generate_response($type, $message){

	    global $response;

	    if($type == "success") $response = "<div class='alert alert-primary'>{$message}</div>";
	    else $response = "<div class='alert alert-warning'>{$message}</div>";

	  }

	  //response messages
	  $not_human       = "Human verification incorrect.";
	  $missing_content = "Please supply all information.";
	  $email_invalid   = "Email Address Invalid.";
	  $message_unsent  = "Message was not sent. Try Again.";
	  $message_sent    = "Bedankt! We hebben je aanvraag ontvangen.";

	  //user posted variables
	  $name = $_POST['message_name'];
	  $email = $_POST['message_email'];
	  $phone = $_POST['message_phone'];
	  $advice = $_POST['message_advice'];
	  $message = $_POST['message_text'];
	  $human = $_POST['message_human'];

	  $msg = "<h3>Naam:</h3>". "\r\n" . $name . "\r\n" .
	  "Telefoonnummer: " . $phone . "\r\n" .
	  "Email: " . $email . "\r\n" .
	  "Adviesgesprek?:" . $advice . "\r\n" . "\r\n" .
	  "Bericht:" . $message . "\r\n"; 

	  $title = the_title('','',false);

	  //php mailer variables
	  $to = get_option('admin_email');
	  $subject = "Nieuwe bezichtigingsaanvraag " . $title . "\r\n";
	  $headers = 'From: '. $email . "\r\n" .
	    'Reply-To: ' . $email . "\r\n";

	  if(!$email == 0){
	      //validate email
	      if(!filter_var($email, FILTER_VALIDATE_EMAIL))
	        my_contact_form_generate_response("error", $email_invalid);
	      else //email is valid
	      {
	        //validate presence of name and message
	        if(empty($name) || empty($message)){
	          my_contact_form_generate_response("error", $missing_content);
	        }
	        else //ready to go!
	        {
	          $sent = wp_mail($to, $subject, strip_tags($msg), $headers);
	          if($sent) my_contact_form_generate_response("success", $message_sent); //message sent!
	          else my_contact_form_generate_response("error", $message_unsent); //message wasn't sent
	        }
	      }
	    }
	  	else if ($_POST['submitted']) my_contact_form_generate_response("error", $missing_content);

	?>

	<div class="bezichtiging-confirmation bg-primary" id="bezichtiging-confirmation">
		<div class="confirmation-content px-3 py-3 story story-centered">
			<h2>Bedankt voor je aanvraag</h2>
			<h4>We nemen zo snel mogelijk contact met je op!</h4>
			<p class="lead mt-5">Trouwens... Al overwogen om je aan te melden als woningzoeker? Dan brengen wij je namelijk als eerste op de hoogte van nieuwe woningen in ons bestand die bij jouw wensen passen!</p>
			<div class="mt-5 text-right">
				<a class="btn btn-light" href="/woningzoeker">Aanmelden als zoeker</a>
				<a class="btn btn-outline-light" href="#" data-action="body-action" data-action-target="bezichtigings-form-active">Dit formulier sluiten</a>
			</div>
		</div>
	</div>

      <div class="bezichtiging-form" id="respond">
      	<div class="container-fluid bezichtiging-form-holder">
      		<div class="row story story-centered">
      			<div class="col-12 mx-auto px-2 px-xl-5 text-center d-none d-sm-block">
		      		<h4 class="mb-3">Een bezichtiging aanvragen:</h4>
		        	<?php echo $response; ?>
		        </div>

		        <form class="form" id="bezichtiging-form" style="height: 0; overflow:hidden;">

		        	<cf-robot-message cf-questions="Hi. Je wilt graag een bezichtiging aanvragen voor <?php the_title(); ?>"></cf-robot-message>
  					<cf-robot-message cf-questions="Als je hier je gegevens invult, dan nemen wij zo snel mogelijk contact met je op"></cf-robot-message>

		        	<div class="form-group mb-3 mb-xl-4">
		        		<label class="label form-control-label" for="name">Naam:</label>
		          		<input class="form-control" type="text" name="message_name" cf-input-placeholder="Vul je naam in?" cf-questions="Wat is je naam?" id="naam" value="<?php echo esc_attr($_POST['message_name']); ?>">
		          	</div>

		          	<div class="form-group mb-3 mb-xl-4">
		          		<label class="label form-control-label" for="message_email">Email:</label>
		          		<input class="form-control" type="email" name="message_email" cf-input-placeholder="Vul je emailadres in?" cf-questions="Hoi {naam}. Wat is je emailadres?" value="<?php echo esc_attr($_POST['message_email']); ?>" required>
		          	</div>

		          	<div class="form-group mb-3 mb-xl-4">
		          		<label class="form-control-label" for="message_phone">Telefoonnummer:</label>
		          		<input class="form-control" type="text" name="message_phone" cf-input-placeholder="Vul je telefoonnummer in" cf-questions="En op welk telefoonnummer kunnen we je bereiken?" value="<?php echo esc_attr($_POST['message_phone']); ?>" required>
		          	</div>

		          	<div class="form-group mb-3 mb-xl-4">
		          		<label class="form-control-label" for="message_text">Bericht:</label>
		          		<textarea class="form-control" name="message_text" cf-questions="Heb je nog andere vragen of opmerkingen?" rows="5"><?php echo esc_textarea($_POST['message_text']); ?></textarea>
		          	</div>

		          	<div class="form-check">
					  	<label class="form-check-label">
					    	<input class="form-check-input" name="message_advice" type="checkbox" value="ja, graag" cf-questions="Stel je prijs op een vrijblijvend financieel adviesgesprek, zodat je precies weet wat je mogelijkheden zijn?" cf-input-placeholder="Druk na je keuze op enter">Ja, graag
					  	</label>
					</div>

		        </form>
		        <div id="cf-context" class="cf-form-holder col-12 dark-theme mx-auto px-0 px-sm-2 px-xl-5 " role="cf-context" cf-context></div>
		        <div class="col-12 px-sm-2 px-xl-5">
		        	<p class="mt-1 mb-1 subtitle"><em>Wij zijn ook bereikbaar op <a>0182 – 63 60 21</a></em></p>
		        </div>
		    </div>
		</div>
      </div>
  </div><!-- contact form section-->



<div class="contact-attention-section">

	<div class="attention-content">
		<?php if (has_post_thumbnail( $post->ID ) ): ?>
		<?php $image = wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID ), 'gallery' ); ?>

		<div class="background-image-holder aspect-ratio-16-9 bg-cover bg-center" style="background-image: url('<?php echo $image[0]; ?>')">
		</div>
		<?php endif; ?>
		<div class="property-titles p-lg-5">
	  		<h3 class="property-title entry-title mb-0 mb-lg-3">
	  			<?php the_title(); ?>	
	  		</h3>
	  		<div class="property_price_holder">
          		<h3 class="property_price text-primary mb-0">
	                <?php 
	                    $huurstring = strip_tags($property["huren"]);
	                    $huurstring = strip_tags($property["huren"]);
					                    $huurtypestring = strip_tags($property["huur_per"]);
					                    if($huurstring == true){
					                      echo $property['huurprijs'];
					                      echo ",-";
					                      echo "<small> / ";
					                      if ($huurtypestring == "Price_per_month"){
					                        echo "per maand";
					                      }
					                      else{
					                      	echo $property['huur_per'] ;
					                      }
					                      echo" </small>";
					                    }
					                      else{
					                        echo $property['price'];
					                        echo ",-";
					                      }
	                    ?>
	                    <small> <?php 
	                    $pricetypestring = strip_tags($property["kosten_koper"]);
	                      if ($pricetypestring == "Costs_buyer"){
	                        echo "K.K.";
	                      }
	                        elseif ($pricetypestring == 'Free_on_name'){
	                          echo 'V.O.N.';
	                      }
	                        else {
	                          echo $property["kosten_koper"];
	                      }
	            
	                    ?>
	                </small>
	            </h3>
	      </div>
	  	</div>
	</div>
</div>

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/space10-community/conversational-form@0.9.80/dist/conversational-form.min.js" crossorigin></script>

<script>
( function( $ ) {
	window.onload = function() {
	    var conversationalForm = window.cf.ConversationalForm.startTheConversation({
	        formEl: document.getElementById("bezichtiging-form"),
	        context: document.getElementById("cf-context"),
	        robotImage: "http://178.62.238.65/wp-content/themes/gouwestad/img/logo-mark.svg",
	        submitCallback: function() {
	            $.ajax({
		            type: 'post',
		            url: '#',
		            data: $('#bezichtiging-form').serialize(),
		            success: function () {
		            	window.ConversationalForm.addRobotChatResponse("Bedankt voor je aanmelding.");
            			window.ConversationalForm.addRobotChatResponse("We nemen zo snel mogelijk contact met je op.");
		              	$("#bezichtiging-confirmation").addClass("active");
		              	console.log("form send");
		            }
		        });
	    	},
		    dictionaryData: {
		        "entry-not-found": "We hebben je invoer niet gevonde",
		        "input-placeholder": "Vul hier je antwoord in ...",
		        "input-placeholder-required": "Vul een antwoord in ...",
		        "input-placeholder-error": "Je invoer is onjuist ...",
		        "input-placeholder-file-error": "Upload mislukt ...",
		        "input-placeholder-file-size-error": "Helaas, je bestand is te groot ...",
		        "input-no-filter": "Geen resultaten voor {input-value}",
		        "user-reponse-and": " en ",
		        "user-reponse-missing": "Je hebt geen antwoord ingevuld of geen voorkeur ...",
		        "general": "Algemeen Type1|Algemeen Type2"
		    },
		    dictionaryRobot: {
		        "text": "Schrijf hier je antwoord.",
		        "input": "Schrijf hier je antwoord.",
		        "name": "Hoe heet je?",
		        "email": "Wat is je emailadres?",
		        "password": "Vul het wachtwoord in",
		        "tel": "Wat is je telefoonnummer?",
		        "radio": "Kies er 1.",
		        "checkbox": "Kies er zoveel als je wilt",
		        "select": "Kies een van deze mogelijkheden.",
		        "general": "Algemeen1|Algemeen2|Algemeen3.."
		    }// empty will throw error
		});
	};
})(jQuery);
	
</script>