<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
        <div style='display: flex; font-size: 12px; margin-top: -10px; font-weight: bold;'><div>Desenvolvido por </div> <img alt='' src='./img/global_hitss_logo.png' style='width: 10px; height: 10px; margin: 4px 2px 0 7px'/>Buffer-TI</div>
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
</x-app-layout>
