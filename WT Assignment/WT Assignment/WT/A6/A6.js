angular.module('timerApp', [])
    .controller('TimerController', ['$interval', function ($interval) {
        var vm = this;
        vm.displayTime = '00:00:00';
        vm.isRunning = false;
        var timer;

        function updateDisplay() {
            var seconds = vm.totalSeconds % 60;
            var minutes = Math.floor((vm.totalSeconds / 60) % 60);
            var hours = Math.floor(vm.totalSeconds / 3600);

            vm.displayTime = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        }

        function pad(number) {
            return (number < 10 ? '0' : '') + number;
        }

        vm.startTimer = function () {
            if (!vm.isRunning) {
                vm.totalSeconds = 0;
                timer = $interval(function () {
                    vm.totalSeconds++;
                    updateDisplay();
                }, 1000);
                vm.isRunning = true;
            }
        };

        vm.stopTimer = function () {
            if (vm.isRunning) {
                $interval.cancel(timer);
                vm.isRunning = false;
            }
        };

        vm.resetTimer = function () {
            vm.totalSeconds = 0;
            updateDisplay();
        };
    }]);
