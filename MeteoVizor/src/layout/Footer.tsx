const Footer = () => {
	return (
		<footer className="footer text-center text-sm-start">
			© {new Date().getFullYear()} MeteoVizor{' '}
			<span className="text-muted d-none d-sm-inline-block float-end">
				Made with Love <i className="mdi mdi-heart text-danger" />
			</span>
		</footer>
	)
}

export default Footer
