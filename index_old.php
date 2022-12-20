<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>Calculateurs Célestus</title>
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<!-- Optional theme -->
	<link rel="stylesheet" href="css/bootstrap-theme.min.css" />	
	<link rel="stylesheet" href="css/font-awesome.min.css" />
	
	<link rel="stylesheet" href="css/style.css" />
	
	<script type="text/javascript"> (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');</script>
	
	<!-- 
	TODO
	-Calculateur pour le coût des technologies
	-Permettre d'additionner les calculs pour plusieurs mines/colos
	-Possibilité d'enregistrer des options en local (vos réductions de coûts, spécialisations, etc)
	-Gestion de vos niveaux de mines/technologies (les informations seront enregistrées uniquement sur votre ordinateur, personne d'autre n'y aura accès)
	-Calculateurs pour les structures orbitales (Rampes de lancement, Absorbeurs, etc), coût des vaisseaux, puissance et coût des plans personnalisés, défenses, production des secteurs/colonies
	-Autres idées?
	-Modules Miniers MK II
	-->
</head>

<body>
<div class="container">
	<div class="panel panel-primary">
		<div class="panel-heading">
			<h2 class="panel-title">
				<b>Calcul du nombre de modules MK II</b>
			</h2>
		</div>
		<div class="panel-body">
			<div id="panGlobal" class="col-md-12 panel-body panel panel-default">			
				<h4>Taux de vente des ressources (en ZRC)</h4>
				<div class="row">
					<div class="col-md-4">
						<label>Métal (Max 5 000)</label>
						<input id="tauxMetal" type="text" class="form-control" value="1000" />
					</div>
					<div class="col-md-4">
						<label>Tritium (Max 15 000)</label>
						<input id="tauxTritium" type="text" class="form-control" value="4000" />
					</div>
					<div class="col-md-4">
						<label>Photopiles (Max 2 000 000)</label>
						<input id="tauxPP" type="text" class="form-control" value="1000000" />
					</div>
				</div>
			</div>
			<div id="panSaisie" class="col-md-6 col-xs-12 panel-body panel panel-default">			
				<h4>Données de l'acheteur</h4>
				<div class="row">
					<div class="col-md-12">
						<label for="selectBatiment">Bâtiment à construire</label>
						<select id="selectBatiment" class="form-control">
							<optgroup label="Structures de production">
								<option value="BatM">Mine de Métal</option>
								<option value="BatT">Raffinerie de Tritium</option>
								<option value="BatH">Urbanisation</option>
								<option value="BatP">Concentrateur</option>
								<option value="BatE">Centrale électrique</option>
								<option value="BatC">META Cité</option>
								<option value="BatGF">Centrale de Fusion</option>
							</optgroup>
							<optgroup label="Structures logistiques">
								<option value="BatCI">Centre Industriel</option>
								<option value="BatUC">Usine Cybernétique</option>
								<option value="BatTech">Centre de Recherche</option>
								<option value="BatCa">Caserne</option>
								<option value="BatCS">Chantier spatial</option>
								<option value="BatSP">SpatioPort</option>
								<option value="BatCR">Centre de recyclage</option>
							</optgroup>
							<optgroup label="Bâtiments expérimentaux">
								<option value="BatRa">Radar</option>
								<option value="SOC">Oeil Céleste</option>
								<option value="SAT">Accélérateur Temporel</option>
								<option value="SBO">Bouclier Occultant</option>
								<option value="SSa">Satomisateur</option>
								<option value="SGH">Générateur Hyperspatial Zero</option>
							</optgroup>
							<optgroup label="Défenses avancées">
								<option value="SDD">Drones de Défense</option>
								<option value="SPO">Défense Orbitale au Plasma</option>
								<option value="SBL">Bouclier Planétaire</option>
							</optgroup>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<label for="nudActuel">Niveau actuel</label>
						<div class="input-group spinner">
							<input id="nudActuel" type="text" class="niveauBat form-control" value="0" />
							<div class="input-group-btn-vertical">
							      <button class="btn btn-default"><i class="fa fa-caret-up"></i></button>
							      <button class="btn btn-default"><i class="fa fa-caret-down"></i></button>
						    </div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="nudDesire">Niveau désiré</label>
						<div class="input-group spinner">
							<input id="nudDesire" type="text" class="niveauBat form-control" value="1" />
							<div class="input-group-btn-vertical">
							      <button class="btn btn-default"><i class="fa fa-caret-up"></i></button>
							      <button class="btn btn-default"><i class="fa fa-caret-down"></i></button>
						    </div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<label for="nudReduc">Réduction coût</label>
						<div class="input-group spinner">
							<input id="nudReduc" type="text" class="reductionCout form-control" value="1" />
							<div class="input-group-btn-vertical">
							      <button class="btn btn-default"><i class="fa fa-caret-up"></i></button>
							      <button class="btn btn-default"><i class="fa fa-caret-down"></i></button>
						    </div>
						</div>
					</div>
					<div class="col-md-6">
						<label for="chkGouvBat">Gouverneur bâtisseur</label>
						<input type="checkbox" id="chkGouvBat" class="checkbox form-control" />
					</div>
				</div>
			</div>
			<div id="panBatisseur" class="col-md-6 col-xs-12 panel-body panel panel-default">			
				<h4>Données du bâtisseur</h4>
				<div class="row">
					<div class="col-md-6">
						<label for="chkGouvAm">Gouverneur-amiral</label>
						<input type="checkbox" id="chkGouvAm" class="checkbox form-control" />
					</div>
					<div class="col-md-6">
						<label for="chkOptPlan">Optimisation des plans</label>
						<input type="checkbox" id="chkOptPlan" class="checkbox form-control" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<label>Nombre de modules</label>
						<input id="txtNbrMKII" type="text" class="form-control" value="0" />
					</div>
					<div class="col-md-6">
						<label for="nudNbrChan">Nombre de chantiers</label>
						<div class="input-group spinner">
							<input id="nudNbrChan" type="text" class="form-control" value="70" />
							<div class="input-group-btn-vertical">
							      <button class="btn btn-default"><i class="fa fa-caret-up"></i></button>
							      <button class="btn btn-default"><i class="fa fa-caret-down"></i></button>
						    </div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12">
					<div id="panResultat" class="col-md-6 col-xs-12 panel panel-default panel-body">			
					<h4>Coût du bâtiment</h4>
					<div class="row">
							<div class="col-md-4">
								<label id="lblCoutMetal">Métal</label>
								<div id="coutMetal" data-toggle="tooltip" title="0">0</div>
							</div>
							<div class="col-md-4">
								<label id="lblCoutTrit">Tritium</label>
								<div id="coutTrit" data-toggle="tooltip" title="0">0</div>
							</div>
							<div class="col-md-4">
								<label id="lblCoutPP">Photopiles</label>
								<div id="coutPP" data-toggle="tooltip" title="0">0</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<label id="lblZRC">Équivalent ZRC</label>
								<div id="coutZRC" data-toggle="tooltip" title="0">0</div>
							</div>
							<div class="col-md-4 label-success">
								<label id="lblMKII">Modules MK II</label>
								<div id="nbrMKII" data-toggle="tooltip" title="0">0</div>
							</div>
							<div class="col-md-4">
								<label id="lblCoutPPMKII">Photopiles avec MK II</label>
								<div id="coutPPMKII" data-toggle="tooltip" title="0">0</div>
							</div>
						</div>
					</div>
					<div id="panModules" class="col-md-6 col-xs-12 panel panel-default panel-body">			
					<h4>Coût des modules</h4>
					<div class="row">
							<div class="col-md-4">
								<label id="lblCoutMetalMKII">Coût Métal</label>
								<div id="coutMetalMKII" data-toggle="tooltip" title="0">0</div>
							</div>
							<div class="col-md-4">
								<label id="lblCoutTritMKII">Coût Tritium</label>
								<div id="coutTritMKII" data-toggle="tooltip" title="0">0</div>
							</div>
							<div class="col-md-4">
								<label id="lblCoutZRCMKII">Coût ZRC</label>
								<div id="coutZRCMKII" data-toggle="tooltip" title="0">0</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<label id="lblZRCMKII">Total ZRC</label>
								<div id="totalZRCMKII" data-toggle="tooltip" title="0">0</div>
							</div>
							<div class="col-md-4">
								<label id="lblTempsMKII">Temps de construction</label>
								<div id="nbrTempsMKII" data-toggle="tooltip" title="0">0</div>
							</div>
							<div class="col-md-4">
								<label id="lblEconomie">Différence</label>
								<div id="totalEconomieZRC" data-toggle="tooltip" title="0">0</div>
							</div>
						</div>
					</div>
			</div>
		</div>
	</div>
</div>

	<div class="navbar navbar-fixed-bottom text-center navbar-inverse" role="footer">
		<div class="container">
			<div class="col-xs-12 col-md-12 navbar-text text-center">
			@ <?php echo intval(date("Y")); ?>  Gagn-Associates<br />
			Site web géré par <a href="http://gagn-associates.com">Aqua</a>
			</div>
		
		</div>
	</div> 

<script type="text/javascript" src="http://code.jquery.com/jquery.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery.jstepper.min.js"></script>
<script type="text/javascript" src="js/jquery.numbox-1.1.1.min.js"></script>
<script type="text/javascript" src="js/formules.min.js"></script>
<script type="text/javascript" src="js/analytics.js"></script>
</body>

</html>
