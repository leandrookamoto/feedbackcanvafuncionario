<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
       
    </x-slot>
    <!-- links cdn -->
<!-- link do axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<!-- link do bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<!-- link do bootstrap js -->
<script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Parte interna do dashboard -->
    <div id='root'></div>
    <!--Footer-->
        <div class="border-top" style="height: 150px">
            <footer class="footer p-3" style="width: 100%">
                <div class="footer-copyright text-center py-1 mt-3">
                    <div id='data'></div> 
                </div>
                <div class="footer-copyright text-center py-1">
        <div>Ferramenta compatível com os navegadores, Chrome 
            <img class="d-inline" width="20px" src="{{ asset('/img/chrome.svg') }}" />, 
            Firefox <img class="d-inline" width="20px" src="{{ asset('/img/firefox.svg') }}" /> 
            e Edge <img class="d-inline" width="20px" src="{{ asset('/img/edge.svg') }}" />
        </div>
    </div>

        </footer>
    </div>

    <script>
  // Função para obter o ano atual
  function getAnoAtual() {
    return new Date().getFullYear();
  }

  // Atualizar conteúdo da div com o ano atual
  document.addEventListener('DOMContentLoaded', function() {
    var dataDiv = document.getElementById('data');
    dataDiv.innerHTML = `© Propriedade Global Hitss ${getAnoAtual()} Desenvolvido por <img class="d-inline" alt='' src='./img/global_hitss_logo.png' style='width: 15px; height: 15px; margin: -5px 2px 0 4px;'> Buffer TI`;
  });


</script>
</x-app-layout>
