@extends('admin.layouts.default')
@section('page-css')
    <link rel="stylesheet" href="{{ asset('admin/vendor/bootstrap/css/bootstrap.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/vendor/animate/animate.compat.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/vendor/font-awesome/css/all.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/vendor/boxicons/css/boxicons.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/vendor/magnific-popup/magnific-popup.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/vendor/select2/css/select2.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/vendor/select2-bootstrap-theme/select2-bootstrap.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('admin/vendor/datatables/media/css/dataTables.bootstrap4.css') }}" />


    <link rel="stylesheet" href="{{ asset('admin/css/theme.css') }}" />

    <link rel="stylesheet" href="{{ asset('admin/css/custom.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/css/product-editor/editor.css') }}" />

    <script src="{{ asset('admin/vendor/modernizr/modernizr.js') }}')}}"></script>
    <script src="{{ asset('admin/master/style-switcher/style.switcher.localstorage.js') }}')}}"></script>
@endsection


@section('content')
    <header class="page-header">
        <h2>Authors Detail</h2>
        <div class="right-wrapper text-right">
            <ol class="breadcrumbs">
                <li>
                    <a href="index.html">
                        <i class="bx bx-home-alt"></i>
                    </a>
                </li>
            </ol>
            <a class="sidebar-right-toggle" data-open="sidebar-right"><i class="fas fa-chevron-left"></i></a>
        </div>
    </header>

    <div class="row">
        <div class="col">
            <section class="card">
                <header class="card-header">
                    <div class="card-actions">
                        <a href="#" class="card-action card-action-toggle" data-card-toggle></a>
                        <a href="#" class="card-action card-action-dismiss" data-card-dismiss></a>
                    </div>
                    <h2 class="card-title">{{$author->name}} {{$author->surname }}'s Books</h2>
                </header>
                <div class="card-body">
                    
                    <table class="table table-bordered table-striped mb-0" id="datatable-tabletools">
                        <thead>
                            <tr>

                                <th>Book Name</th>

                                <th>Detail</th>

                                <th>Price</th>

                                <th>Quantity</th>


                            </tr>
                        </thead>
                        <tbody>

                            @foreach ($books as $book)
                            
                            <tr>
                                <td>{{ $book->name }}</td>

                                <td>{{ $book->detail }}</td>

                                <td>{{ $book->price }} TL</td>

                                <td>{{ $book->quantity }}</td>

                            </tr>

                            @endforeach



                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
@endsection

@section('page-js')
    <script src="{{ asset('admin/vendor//jquery/jquery.js') }}"></script>
    <script src="{{ asset('admin/vendor//jquery-browser-mobile/jquery.browser.mobile.js') }}"></script>
    <script src="{{ asset('admin/vendor//jquery-cookie/jquery.cookie.js') }}"></script>
    <script src="{{ asset('master/style-switcher/style.switcher.js') }}"></script>
    <script src="{{ asset('admin/vendor//popper/umd/popper.min.js') }}"></script>
    <script src="{{ asset('admin/vendor//bootstrap/js/bootstrap.js') }}"></script>
    <script src="{{ asset('admin/vendor//bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
    <script src="{{ asset('admin/vendor//common/common.js') }}"></script>
    <script src="{{ asset('admin/vendor//nanoscroller/nanoscroller.js') }}"></script>
    <script src="{{ asset('admin/vendor//magnific-popup/jquery.magnific-popup.js') }}"></script>
    <script src="{{ asset('admin/vendor//jquery-placeholder/jquery.placeholder.js') }}"></script>
    <script src="{{ asset('admin/vendor//select2/js/select2.js') }}"></script>
    <script src="{{ asset('admin/vendor//datatables/media/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('admin/vendor//datatables/media/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('admin/vendor//datatables/extras/TableTools/Buttons-1.4.2/js/dataTables.buttons.min.js') }}">
    </script>
    <script src="{{ asset('admin/vendor//datatables/extras/TableTools/Buttons-1.4.2/js/buttons.bootstrap4.min.js') }}">
    </script>
    <script src="{{ asset('admin/vendor//datatables/extras/TableTools/Buttons-1.4.2/js/buttons.html5.min.js') }}"></script>
    <script src="{{ asset('admin/vendor//datatables/extras/TableTools/Buttons-1.4.2/js/buttons.print.min.js') }}"></script>
    <script src="{{ asset('admin/vendor//datatables/extras/TableTools/JSZip-2.5.0/jszip.min.js') }}"></script>
    <script src="{{ asset('admin/vendor//datatables/extras/TableTools/pdfmake-0.1.32/pdfmake.min.js') }}"></script>
    <script src="{{ asset('admin/vendor//datatables/extras/TableTools/pdfmake-0.1.32/vfs_fonts.js') }}"></script>


    <script src="{{ asset('admin/js/theme.js') }}"></script>

    <script src="{{ asset('admin/js/custom.js') }}"></script>

    <script src="{{ asset('admin/js/theme.init.js') }}"></script>

    <script src="{{ asset('admin/js/examples/examples.datatables.default.js') }}"></script>
    <script src="{{ asset('admin/js/examples/examples.datatables.row.with.details.js') }}"></script>
    <script src="{{ asset('admin/js/examples/examples.datatables.tabletools.js') }}"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.6/fabric.min.js"></script>
    <script src="{{ asset('admin/js/product-editor/control.js') }}"></script>
    <script src="{{ asset('admin/js/product-editor/editor.js') }}"></script>
    <script>
        function openEditor(id) {
            const editor = new ProductEditor(Number(id), null, 'admin');
            editor.initialize();

            document.addEventListener('productEditorClosed', () => {
                window.location.reload();
            });
        }
    </script>
@endsection
