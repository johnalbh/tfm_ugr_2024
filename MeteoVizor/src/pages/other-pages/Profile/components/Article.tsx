import { Badge, Card, CardBody, Col, Row } from 'react-bootstrap'
import small1 from '@/assets/images/logo.png'

const Article = () => {
	return (
		<Card>
			<CardBody>
				<img
					src={small1}
					className="img-fluid"
					style={{ height: '120px', textAlign: 'center' }}
				/>

				<div className="post-title mt-4">
					<Row>
						<Col>
							<span className="badge badge-soft-primary">
								Master's Project Guide
							</span>
						</Col>
					</Row>
					<h5 className="font-20 fw-bold d-block mt-3 mb-4">
						Web Platform for Meteorological Data in Wind Farms
					</h5>
					<span className="font-15 bg-light py-2 px-3 rounded">
						Este Trabajo Fin de Máster presenta el desarrollo de una plataforma
						web para la visualización y análisis de variables meteorológicas en
						parques eólicos.
					</span>
					<p className="font-15 mt-4">
						El proyecto aborda los desafíos actuales en la gestión de grandes
						volúmenes de datos meteorológicos, ofreciendo una solución que
						integra tecnologías modernas de procesamiento y visualización de
						datos.
					</p>
					<p className="font-15">
						La plataforma desarrollada utiliza el formato Zarr para la
						optimización del almacenamiento y acceso a datos, logrando una
						reducción de más del 50% en el tamaño de almacenamiento y una mejora
						significativa en los tiempos de acceso. Se implementó una API en
						Python utilizando FastAPI para proporcionar acceso eficiente a los
						datos históricos, y se integró GeoServer para la visualización
						geoespacial de capas NetCDF diarias.
					</p>
					<h5 className="font-20 fw-bold d-block mt-3 mb-4">
						Interfaz de Usuario y Análisis
					</h5>
					<p className="font-15">
						La interfaz de usuario, desarrollada en React.js, ofrece
						visualizaciones interactivas y responsivas, permitiendo a los
						operadores de parques eólicos analizar patrones meteorológicos
						complejos de manera intuitiva.
					</p>
					<p className="font-15">
						Este trabajo contribuye al campo de la energía eólica proporcionando
						una herramienta avanzada para la gestión de datos meteorológicos,
						con el potencial de mejorar la eficiencia operativa y la toma de
						decisiones en parques eólicos.
					</p>
					<p className="font-15 mb-0">
						Los resultados obtenidos sugieren que la plataforma puede ayudar
						significativamente a optimizar la gestión de los parques eólicos,
						sentando las bases para futuros desarrollos en este campo.
					</p>
				</div>
				<div className="mt-5">
					<h5 className="font-20 fw-bold d-block mb-3">Agradecimientos</h5>
					<p className="font-15">
						Al concluir este Trabajo Fin de Máster, quisiera expresar mi más
						sincero agradecimiento a todas aquellas personas e instituciones que
						han hecho posible su realización. En primer lugar, mi más profundo
						agradecimiento a director Juan Carlos Torres, cuyo apoyo
						incondicional y guía experta han sido fundamentales en el desarrollo
						de este TFM. Su dedicación y conocimientos han sido una fuente
						constante de inspiración y aprendizaje. Un agradecimiento especial a
						mi compañera de trabajo, Dra. Irma Riadigos, PhD en Física. Su
						experiencia y ayuda han sido invaluables para comprender y validar
						los datos generados, asegurando que los cálculos y resultados
						tuvieran sentido desde una perspectiva científica rigurosa. Quiero
						expresar mi gratitud a Siemens Gamesa por brindarme la oportunidad
						de desarrollar parte de este trabajo durante mi jornada laboral. Su
						apoyo y la confianza depositada en mí han sido cruciales para llevar
						este proyecto a buen término. A todos los docentes del programa de
						Máster, mi más sincero reconocimiento. Sus enseñanzas y orientación
						han sido esenciales para integrar las diversas áreas de conocimiento
						necesarias en el desarrollo de este TFM. Su experiencia y dedicación
						han enriquecido enormemente mi formación académica y profesional.
						Finalmente, agradezco a mi familia y amigos por su paciencia,
						comprensión y apoyo incondicional durante todo este proceso. Su
						aliento constante ha sido fundamental para superar los momentos de
						dificultad y llegar a la culminación de este trabajo. A todos ellos,
						mi más sincero agradecimiento.
					</p>
				</div>
			</CardBody>
		</Card>
	)
}

export default Article
